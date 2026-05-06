import { icons, IconName } from '../../icons/icons'
export type { IconName }

export interface IconProps {
  name: IconName
  size?: number
  className?: string
  'aria-hidden'?: boolean
  'aria-label'?: string
}

export function Icon({ name, size = 24, className, ...rest }: IconProps) {
  const svg = icons[name]
    .replace(/width="\d+(\.\d+)?"/, `width="${size}"`)
    .replace(/height="\d+(\.\d+)?"/, `height="${size}"`)

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', width: size, height: size, flexShrink: 0 }}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...rest}
    />
  )
}
