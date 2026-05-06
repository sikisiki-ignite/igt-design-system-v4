import { useState } from 'react'

type Brand = 'default' | 'green' | 'purple' | 'teal'
type Theme = 'light' | 'dark'
type Radius = 'default' | 'soft' | 'friendly' | 'playful' | 'formal'
type Size = 'comfortable' | 'compact'

const html = document.documentElement

function setAttr(attr: string, value: string) {
  html.setAttribute(attr, value)
}

function SegmentGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="tc-group">
      <span className="tc-label">{label}</span>
      <div className="tc-segments">
        {options.map(opt => (
          <button
            key={opt}
            className={`tc-seg${value === opt ? ' tc-seg--active' : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ThemeControls() {
  const [brand, setBrand] = useState<Brand>('default')
  const [theme, setTheme] = useState<Theme>('light')
  const [radius, setRadius] = useState<Radius>('default')
  const [size, setSize] = useState<Size>('comfortable')

  function handleBrand(v: Brand) {
    setBrand(v)
    setAttr('data-brand', v)
  }
  function handleTheme(v: Theme) {
    setTheme(v)
    setAttr('data-theme', v)
  }
  function handleRadius(v: Radius) {
    setRadius(v)
    setAttr('data-radius', v)
  }
  function handleSize(v: Size) {
    setSize(v)
    setAttr('data-size', v)
  }

  return (
    <div className="tc-bar">
      <span className="tc-title">IGT Design System</span>
      <div className="tc-controls">
        <SegmentGroup label="BRAND" options={['default', 'green', 'purple', 'teal'] as const} value={brand} onChange={handleBrand} />
        <SegmentGroup label="THEME" options={['light', 'dark'] as const} value={theme} onChange={handleTheme} />
        <SegmentGroup label="RADIUS" options={['default', 'soft', 'friendly', 'playful', 'formal'] as const} value={radius} onChange={handleRadius} />
        <SegmentGroup label="SIZE" options={['comfortable', 'compact'] as const} value={size} onChange={handleSize} />
      </div>
    </div>
  )
}
