import { useState } from 'react'
import './OrgTree.css'
import { Icon } from '../Icon/Icon'

export interface OrgTreeItem {
  id: string
  label: string
  count?: number
  badge?: string
  disabled?: boolean
  children?: OrgTreeItem[]
}

export interface OrgTreeProps {
  items: OrgTreeItem[]
  selectedId?: string
  onSelect?: (id: string) => void
  expandedIds?: string[]
  onExpandChange?: (id: string, expanded: boolean) => void
  size?: 'default' | 'lg'
  className?: string
}

interface OrgTreeNodeProps {
  item: OrgTreeItem
  depth: number
  selectedId?: string
  onSelect?: (id: string) => void
  expandedIds: Set<string>
  onToggleExpand: (id: string) => void
  size: 'sm' | 'md'
}

const INDENT = 20 // px per depth level

function OrgTreeNode({
  item,
  depth,
  selectedId,
  onSelect,
  expandedIds,
  onToggleExpand,
  size,
}: OrgTreeNodeProps) {
  const hasChildren = (item.children?.length ?? 0) > 0
  const expanded = expandedIds.has(item.id)
  const selected = item.id === selectedId
  const iconSize = size === 'md' ? 16 : 14

  return (
    <div className="org-tree__node">
      <div className="org-tree__row">
        <button
          type="button"
          className="org-tree__item"
          data-selected={selected ? '' : undefined}
          data-disabled={item.disabled ? '' : undefined}
          disabled={item.disabled}
          onClick={() => !item.disabled && onSelect?.(item.id)}
          style={depth > 1 ? { paddingLeft: (depth - 1) * INDENT } : undefined}
          aria-selected={selected}
          aria-expanded={hasChildren ? expanded : undefined}
        >
          {/* Bullet: open/close chevron for parents, blank for leaves (policy: dot + treeguide 동시 사용 금지) */}
          <span className="org-tree__bullet" aria-hidden>
            {hasChildren && (
              <span
                className="org-tree__expand"
                onClick={(e) => { e.stopPropagation(); onToggleExpand(item.id) }}
              >
                <Icon
                  name={expanded ? 'chevronDownSmallOutline2dp' : 'chevronRightSmallOutline2dp'}
                  size={iconSize}
                />
              </span>
            )}
          </span>

          <span className="org-tree__label">{item.label}</span>

          {item.badge != null && (
            <span className="org-tree__badge">{item.badge}</span>
          )}
          {item.count != null && (
            <span className="org-tree__count">{item.count}</span>
          )}
        </button>
      </div>

      {hasChildren && expanded && (
        <div className="org-tree__children" role="group">
          {item.children!.map((child) => (
            <OrgTreeNode
              key={child.id}
              item={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              onToggleExpand={onToggleExpand}
              size={size}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function OrgTree({
  items,
  selectedId,
  onSelect,
  expandedIds: controlledExpandedIds,
  onExpandChange,
  size = 'lg',
  className,
}: OrgTreeProps) {
  const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string>>(new Set())
  const expandedIds = controlledExpandedIds
    ? new Set(controlledExpandedIds)
    : internalExpandedIds

  const rowSize: 'sm' | 'md' = size === 'lg' ? 'md' : 'sm'

  const handleToggleExpand = (id: string) => {
    const next = new Set(expandedIds)
    if (next.has(id)) {
      next.delete(id)
      onExpandChange?.(id, false)
    } else {
      next.add(id)
      onExpandChange?.(id, true)
    }
    if (!controlledExpandedIds) setInternalExpandedIds(next)
  }

  return (
    <div
      className={['org-tree', className].filter(Boolean).join(' ')}
      data-size={rowSize}
      role="tree"
    >
      {items.map((item) => (
        <OrgTreeNode
          key={item.id}
          item={item}
          depth={1}
          selectedId={selectedId}
          onSelect={onSelect}
          expandedIds={expandedIds}
          onToggleExpand={handleToggleExpand}
          size={rowSize}
        />
      ))}
    </div>
  )
}
