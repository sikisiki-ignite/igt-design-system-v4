#!/usr/bin/env node
/**
 * Generates dist/igt.css — a single static CSS bundle for HTML prototyping.
 * No JS required: <link rel="stylesheet" href="./node_modules/igt-design-system-v4/dist/igt.css">
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

const TOKEN_FILES = [
  'src/tokens/primitives.css',
  'src/tokens/semantic.css',
  'src/tokens/themes.css',
  'src/tokens/typography.css',
  'src/tokens/effects.css',
  'src/tokens/component.css',
]

function findCssFiles(dir) {
  const results = []
  for (const item of readdirSync(dir).sort()) {
    const full = join(dir, item)
    if (statSync(full).isDirectory()) {
      results.push(...findCssFiles(full))
    } else if (item.endsWith('.css')) {
      results.push(full)
    }
  }
  return results
}

// Font CSS with path corrected: ./font.otf → ../src/fonts/font.otf
// (dist/igt.css lives in dist/, fonts live in src/fonts/)
const fontCss = readFileSync(join(root, 'src/fonts/fonts.css'), 'utf8')
  .replace(/url\('\.\/([^']+)'\)/g, "url('../src/fonts/$1')")

const componentCssFiles = findCssFiles(join(root, 'src/components'))

let output = `/* IGT Design System v4 — Static CSS Bundle
 * Generated: ${new Date().toISOString()}
 *
 * Usage (HTML):
 *   <link rel="stylesheet" href="./node_modules/igt-design-system-v4/dist/igt.css">
 *
 * Includes: fonts + tokens (primitives/semantic/themes/typography/effects/component) + all component CSS
 */\n\n`

output += fontCss + '\n\n'

for (const file of TOKEN_FILES) {
  output += readFileSync(join(root, file), 'utf8') + '\n\n'
}

for (const file of componentCssFiles) {
  output += readFileSync(file, 'utf8') + '\n\n'
}

mkdirSync(join(root, 'dist'), { recursive: true })
writeFileSync(join(root, 'dist/igt.css'), output)
console.log(`[IGT DS] ✓ dist/igt.css generated (${Math.round(output.length / 1024)}KB)`)
