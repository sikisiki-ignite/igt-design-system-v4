import { useEffect, useState } from 'react'

type NavItem = { id: string; label: string }
type NavGroup = { group: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    group: 'Buttons & Actions',
    items: [
      { id: 'button', label: 'Button' },
      { id: 'icon-button', label: 'IconButton' },
      { id: 'overlay-action', label: 'OverlayAction' },
      { id: 'floating-button', label: 'FloatingButton' },
      { id: 'arrow-control', label: 'ArrowControl' },
      { id: 'search-trigger', label: 'SearchTrigger' },
      { id: 'text-button', label: 'TextButton' },
      { id: 'link', label: 'Link' },
      { id: 'action-toggle', label: 'ActionToggle' },
      { id: 'icon-toggle', label: 'IconToggle' },
    ],
  },
  {
    group: 'Controls',
    items: [
      { id: 'menu', label: 'Menu' },
      { id: 'mode-switch-button', label: 'ModeSwitchButton' },
      { id: 'button-group', label: 'ButtonGroup' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'radio-box', label: 'RadioBox' },
      { id: 'switch', label: 'Switch' },
      { id: 'chip', label: 'Chip' },
      { id: 'rating', label: 'Rating' },
      { id: 'number-stepper', label: 'NumberStepper' },
      { id: 'slider', label: 'Slider' },
    ],
  },
  {
    group: 'Input',
    items: [
      { id: 'text-field', label: 'TextField' },
      { id: 'tag-input', label: 'TagInput' },
      { id: 'text-area', label: 'TextArea' },
      { id: 'search', label: 'Search' },
      { id: 'select', label: 'Select' },
      { id: 'date-picker', label: 'DatePicker' },
    ],
  },
  {
    group: 'Feedback',
    items: [
      { id: 'alert', label: 'Alert' },
      { id: 'banner', label: 'Banner' },
      { id: 'toast', label: 'Toast' },
      { id: 'state-view', label: 'StateView' },
      { id: 'skeleton', label: 'Skeleton' },
    ],
  },
  {
    group: 'Navigation',
    items: [
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'page-indicator', label: 'PageIndicator' },
      { id: 'pagination', label: 'Pagination' },
      { id: 'tab', label: 'Tab' },
      { id: 'segment-control', label: 'SegmentControl' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'side-navigation', label: 'SideNavigation' },
      { id: 'org-tree', label: 'OrgTree' },
    ],
  },
  {
    group: 'Overlay',
    items: [
      { id: 'backdrop', label: 'Backdrop' },
      { id: 'hover-hint', label: 'HoverHint' },
      { id: 'tooltip', label: 'Tooltip' },
      { id: 'popover', label: 'Popover' },
      { id: 'dialog', label: 'Dialog' },
      { id: 'drawer', label: 'Drawer' },
    ],
  },
  {
    group: 'Display',
    items: [
      { id: 'avatar', label: 'Avatar' },
      { id: 'badge', label: 'Badge' },
      { id: 'label', label: 'Label' },
      { id: 'accordion', label: 'Accordion' },
      { id: 'table', label: 'Table' },
      { id: 'divider', label: 'Divider' },
      { id: 'card', label: 'Card / KpiCard' },
    ],
  },
]

const ALL_IDS = NAV_GROUPS.flatMap(g => g.items.map(i => i.id))

export function ShowcaseNav() {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>()

    const handleIntersect = (id: string) => (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(id)
        }
      }
    }

    for (const id of ALL_IDS) {
      const el = document.getElementById(id)
      if (!el) continue
      const obs = new IntersectionObserver(handleIntersect(id), {
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0,
      })
      obs.observe(el)
      observers.set(id, obs)
    }

    return () => {
      observers.forEach(obs => obs.disconnect())
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 64
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="sc-nav">
      <div className="sc-nav-inner">
        {NAV_GROUPS.map(group => (
          <div key={group.group} className="sc-nav-group">
            <div className="sc-nav-group-label">{group.group}</div>
            {group.items.map(item => (
              <button
                key={item.id}
                className={`sc-nav-item${activeId === item.id ? ' sc-nav-item--active' : ''}`}
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </nav>
  )
}
