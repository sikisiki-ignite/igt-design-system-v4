#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { readFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dir = dirname(fileURLToPath(import.meta.url))
const registry = JSON.parse(readFileSync(join(__dir, 'registry.json'), 'utf8'))

const server = new McpServer({
  name: 'igt-design-system',
  version: registry.version,
})

// ── Tool 1: list_components ──────────────────────────
server.tool(
  'list_components',
  'List all IGT Design System components, optionally filtered by category.',
  {
    category: z.enum(['action', 'input', 'navigation', 'feedback', 'layout', 'overlay', 'base', 'all'])
      .optional()
      .default('all')
      .describe("Filter by category. Options: action, input, navigation, feedback, layout, overlay, base, all"),
  },
  ({ category }) => {
    const items = category === 'all'
      ? registry.components
      : registry.components.filter(c => c.category === category)

    const grouped = {}
    for (const c of items) {
      if (!grouped[c.category]) grouped[c.category] = []
      grouped[c.category].push(c.name)
    }

    const lines = [`# IGT Design System — ${registry.version}`, `Package: \`${registry.package}\``, '']
    for (const [cat, names] of Object.entries(grouped)) {
      lines.push(`## ${cat} (${names.length})`)
      lines.push(names.map(n => `- ${n}`).join('\n'))
      lines.push('')
    }
    lines.push('Use `get_component` to see props and usage for a specific component.')

    return { content: [{ type: 'text', text: lines.join('\n') }] }
  }
)

// ── Tool 2: get_component ────────────────────────────
server.tool(
  'get_component',
  'Get detailed props, description, and usage example for a specific IGT Design System component.',
  {
    name: z.string().describe('Component name (e.g. "Button", "TextField", "Dialog")'),
  },
  ({ name }) => {
    const comp = registry.components.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    )
    if (!comp) {
      const names = registry.components.map(c => c.name).join(', ')
      return {
        content: [{
          type: 'text',
          text: `Component "${name}" not found.\n\nAvailable components:\n${names}`,
        }],
        isError: true,
      }
    }

    const propsLines = Object.entries(comp.props || {})
      .map(([k, v]) => `  ${k}: ${v}`)
      .join('\n')

    const specPath = join(__dir, '..', 'src', 'components', comp.name, 'figma-spec.json')
    const figmaGateWarning = existsSync(specPath)
      ? ''
      : `\n⚠️ FIGMA GATE: figma-spec.json not found for ${comp.name}.\nThis data is CODE-DERIVED, NOT Figma-verified. Do not use as ground truth for props.\nRun Step 0: fetch mcp__figma__get_figma_data and create src/components/${comp.name}/figma-spec.json before making any changes.\n\n---\n`

    const text = [
      figmaGateWarning,
      `# ${comp.name}`,
      `**Category:** ${comp.category}`,
      '',
      `## Description`,
      comp.description,
      '',
      `## Import`,
      `\`\`\`ts`,
      comp.import,
      `\`\`\``,
      '',
      `## Props`,
      `\`\`\`ts`,
      `interface ${comp.name}Props {`,
      propsLines,
      `}`,
      `\`\`\``,
      '',
      `## Usage Example`,
      `\`\`\`tsx`,
      comp.example,
      `\`\`\``,
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }
)

// ── Tool 3: search_components ────────────────────────
server.tool(
  'search_components',
  'Search IGT Design System components by keyword. Searches name, description, and props.',
  {
    query: z.string().describe('Search keyword (e.g. "button", "form", "modal", "toggle", "날짜")'),
  },
  ({ query }) => {
    const q = query.toLowerCase()
    const results = registry.components.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      Object.keys(c.props || {}).some(k => k.toLowerCase().includes(q)) ||
      Object.values(c.props || {}).some(v => String(v).toLowerCase().includes(q))
    )

    if (!results.length) {
      return {
        content: [{
          type: 'text',
          text: `No components found for "${query}".`,
        }],
      }
    }

    const lines = [`# Search: "${query}" — ${results.length} result(s)`, '']
    for (const c of results) {
      lines.push(`## ${c.name} (${c.category})`)
      lines.push(c.description)
      lines.push(`\`${c.import}\``)
      lines.push('')
    }

    return { content: [{ type: 'text', text: lines.join('\n') }] }
  }
)

// ── Tool 4: get_figma_spec ───────────────────────────
server.tool(
  'get_figma_spec',
  'Get the Figma-derived spec for a component. Returns componentPropertyDefinitions and propMapping. ALWAYS call this BEFORE editing a component — it is the ground truth for props.',
  {
    name: z.string().describe('Component name (e.g. "Button", "Radio")'),
  },
  ({ name }) => {
    const specPath = join(__dir, '..', 'src', 'components', name, 'figma-spec.json')
    if (!existsSync(specPath)) {
      return {
        content: [{
          type: 'text',
          text: [
            `⛔ figma-spec.json NOT FOUND for "${name}".`,
            '',
            'This component has NOT been synced with Figma.',
            'You MUST complete Step 0 before editing any code:',
            '',
            `  1. Find figmaNodeId in igt-ai-studio-v4/scripts/component-registry.json (manufacturing repo) for "${name}"`,
            `  2. Call mcp__figma__get_figma_data(fileKey="VIUhZbtjMzxEHzkpSvfIDR", nodeId="<nodeId>")`,
            `  3. Write src/components/${name}/figma-spec.json with the extracted componentPropertyDefinitions`,
            `  4. Fill in propMapping (Figma property names → TypeScript prop names)`,
            '',
            'Editing code without figma-spec.json is a methodology violation.',
          ].join('\n'),
        }],
        isError: true,
      }
    }

    const spec = JSON.parse(readFileSync(specPath, 'utf8'))
    const openGaps = (spec.gaps || []).filter(g => g.status !== 'fixed')
    const lines = [
      `# ${name} — Figma Spec`,
      `**figmaNodeId:** ${spec._meta.figmaNodeId}`,
      `**Extracted:** ${spec._meta.extractedAt}`,
      '',
      '## componentPropertyDefinitions (Figma ground truth)',
      '```json',
      JSON.stringify(spec.componentPropertyDefinitions, null, 2),
      '```',
      '',
      '## propMapping (Figma → TypeScript)',
      '```json',
      JSON.stringify(spec.propMapping, null, 2),
      '```',
    ]
    if (openGaps.length > 0) {
      lines.push('', `## Open Gaps (${openGaps.length})`)
      for (const g of openGaps) lines.push(`- [${g.priority}] ${g.figmaProp}`)
    } else {
      lines.push('', '## Gaps', 'None open — all gaps resolved.')
    }

    return { content: [{ type: 'text', text: lines.join('\n') }] }
  }
)

// ── Tool 5: get_theme_info ───────────────────────────
server.tool(
  'get_theme_info',
  'Get IGT Design System theme configuration — data attributes, CSS custom properties usage, and theming guide.',
  {},
  () => {
    const text = [
      '# IGT Design System — Theme Configuration',
      '',
      '## HTML Root Attributes',
      '```html',
      '<html',
      '  data-theme="light | dark"',
      '  data-radius="default | soft | friendly | playful | formal"',
      '  data-size="comfortable | compact"',
      '  data-brand="<brand-name>"',
      '>',
      '```',
      '',
      '## Tailwind Utility Classes (available)',
      '- `bg-surface`, `bg-surface-upper`, `bg-base`',
      '- `text-fg-strong`, `text-fg-default`, `text-fg-muted`, `text-fg-subtle`',
      '- `border-border` (neutral border)',
      '- `bg-brand-solid` (brand primary fill)',
      '',
      '## CSS Custom Properties',
      '- Semantic: `--sys-content-*`, `--sys-container-*`, `--sys-border-*`',
      '- Component: `--input-*`, `--action-*`, `--navigation-*`, `--feedback-*`, `--overlay-*`, `--layout-*`',
      '',
      '## Package',
      `\`${registry.package}\``,
      '',
      '## Tooltip Requirement',
      'Wrap the app with `<TooltipProvider.Provider>` to enable Tooltip components.',
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }
)

// ── Tool 6: list_patterns ────────────────────────────
server.tool(
  'list_patterns',
  'List all available IGT Design System page/screen patterns. Use this before building a full page to see if a matching pattern exists.',
  {},
  () => {
    const patterns = registry.patterns || []
    if (!patterns.length) {
      return { content: [{ type: 'text', text: 'No patterns registered yet.' }] }
    }
    const lines = ['# IGT Design System — Page Patterns', '']
    for (const p of patterns) {
      lines.push(`## ${p.name}`)
      lines.push(p.description)
      lines.push(`**Components:** ${p.components.join(', ')}`)
      lines.push('')
    }
    lines.push('Use `get_pattern` to see structure and full example code.')
    return { content: [{ type: 'text', text: lines.join('\n') }] }
  }
)

// ── Tool 7: get_pattern ──────────────────────────────
server.tool(
  'get_pattern',
  'Get detailed structure and example code for a specific IGT Design System page pattern.',
  {
    name: z.string().describe('Pattern name (e.g. "BackofficeListPage")'),
  },
  ({ name }) => {
    const patterns = registry.patterns || []
    const pattern = patterns.find(p => p.name.toLowerCase() === name.toLowerCase())
    if (!pattern) {
      const names = patterns.map(p => p.name).join(', ')
      return {
        content: [{
          type: 'text',
          text: `Pattern "${name}" not found.\n\nAvailable patterns:\n${names || '(none)'}`,
        }],
        isError: true,
      }
    }

    const structureLines = (pattern.structure || [])
      .map(s => `- **${s.section}**: ${Array.isArray(s.components) ? s.components.join(' + ') : s.component}  \n  → ${s.note}`)
      .join('\n')

    const text = [
      `# ${pattern.name}`,
      `**Category:** ${pattern.category}`,
      `**Figma Node:** \`${pattern.figmaNodeId}\``,
      '',
      '## Description',
      pattern.description,
      '',
      '## Components Used',
      pattern.components.map(c => `- \`${c}\``).join('\n'),
      '',
      '## Page Structure',
      structureLines,
      '',
      '## Example Code',
      '```tsx',
      pattern.example,
      '```',
    ].join('\n')

    return { content: [{ type: 'text', text }] }
  }
)

// ── Start ────────────────────────────────────────────
const transport = new StdioServerTransport()
await server.connect(transport)
