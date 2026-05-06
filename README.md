# IGT Design System v4

Figma-first, AI-optimized design system. 59 components, all derived from `figma-spec.json` ground truth.

## Quick Start

```bash
npm install ./igt-design-system-v4-0.1.0.tgz
# or (after npm publish)
npm install igt-design-system-v4
```

Wrap your app root with theme attributes:

```html
<html
  data-theme="light"
  data-radius="default"
  data-size="comfortable"
  data-brand="default"
>
```

Import CSS tokens and use components:

```tsx
import 'igt-design-system-v4/dist/index.css'
import { Button, TextField, Dialog } from 'igt-design-system-v4'
```

## Components (59)

| Category | Components |
|----------|-----------|
| **action** (15) | Button, IconButton, OverlayAction, FloatingButton, ArrowControl, SearchTrigger, TextButton, Link, ActionToggle, IconToggle, Menu, MenuItem, ModeSwitchButton, ButtonGroupAttached, ButtonGroup |
| **input** (17) | TextField, TextArea, Search, Select, DatePicker, Checkbox, RadioBox, Switch, NumberStepper, Slider, Rating, TagInput, ActionChip, ChoiceChip, FilterChip, InputChip, MetaChip |
| **navigation** (8) | Breadcrumb, PageIndicator, Pagination, Tab, SegmentControl, Navigation, SideNavigation, OrgTree |
| **feedback** (5) | Alert, Banner, Toast, StateView, Skeleton |
| **overlay** (6) | Dialog, Drawer, Backdrop, Tooltip, HoverHint, Popover |
| **base** (8) | Avatar, Badge, Label, Accordion, Table, Card, KpiCard, Divider |

## Theme Attributes

```html
<html
  data-theme="light | dark"
  data-radius="default | soft | friendly | playful | formal"
  data-size="comfortable | compact"
  data-brand="<brand-name>"
>
```

## Tooltip Setup

Wrap your app with `TooltipProvider` to enable Tooltip components:

```tsx
import * as TooltipProvider from '@radix-ui/react-tooltip'

<TooltipProvider.Provider>
  <App />
</TooltipProvider.Provider>
```

---

## MCP Server (AI Integration)

Connect the MCP server to Claude Code so AI can look up components, props, and usage examples.

### 1. Add to `.claude/mcp.json`

```json
{
  "mcpServers": {
    "igt-design-system": {
      "command": "node",
      "args": ["/Users/<your-name>/Documents/IGTdesignsystem-v4/mcp/server.mjs"]
    }
  }
}
```

Replace `/Users/<your-name>/Documents/IGTdesignsystem-v4` with the actual path on your machine.

### 2. Verify Connection

In Claude Code, run:

```
list_components
```

Expected response: 59 components grouped by category.

### 3. Available MCP Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all components, optionally filtered by category |
| `get_component` | Get props, description, and usage example for a component |
| `search_components` | Search components by keyword |
| `get_figma_spec` | Get Figma-derived spec (propMapping, gaps) for a component |
| `get_theme_info` | Get theme attributes and CSS custom property guide |

### Usage Example

```
# In Claude Code conversation
get_component TextField
→ returns props interface, import statement, usage example

search_components 날짜
→ returns DatePicker

list_components input
→ returns all 17 input components
```

---

## AI Development Rules

When using this design system with Claude Code or any AI coding tool:

- Import components exclusively from `igt-design-system-v4`
- Do **not** write custom CSS or use Tailwind scale classes for design values
- Layout utilities only (`flex`, `items-center`, `gap-*`, etc.) are allowed in Tailwind
- Use `get_component` before writing any component code
- Check `get_theme_info` for theming guidance

---

## Peer Dependencies

```
react >= 18.0.0
react-dom >= 18.0.0
```
