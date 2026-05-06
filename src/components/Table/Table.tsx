import React, { useState } from 'react';
import { Checkbox } from '../Checkbox/Checkbox';
import './Table.css';

type TableSize = 'md' | 'lg';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  size?: TableSize;
  selectable?: boolean;
  selectedRows?: Set<number>;
  onRowSelect?: (index: number, selected: boolean) => void;
  rowKey?: keyof T | ((row: T, index: number) => string | number);
  emptyState?: React.ReactNode;
  className?: string;
}

function getRowKey<T extends Record<string, unknown>>(
  row: T,
  index: number,
  rowKey?: keyof T | ((row: T, index: number) => string | number),
): string | number {
  if (!rowKey) return index;
  if (typeof rowKey === 'function') return rowKey(row, index);
  return row[rowKey] as string | number;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  size = 'lg',
  selectable = false,
  selectedRows,
  onRowSelect,
  rowKey,
  emptyState,
  className,
}: TableProps<T>) {
  const [internalSelected, setInternalSelected] = useState<Set<number>>(new Set());
  const controlled = selectedRows !== undefined;
  const selected = controlled ? selectedRows : internalSelected;

  const isAllSelected = data.length > 0 && data.every((_, i) => selected.has(i));
  const isIndeterminate = !isAllSelected && data.some((_, i) => selected.has(i));

  function toggleAll() {
    if (controlled) return;
    if (isAllSelected) {
      setInternalSelected(new Set());
    } else {
      setInternalSelected(new Set(data.map((_, i) => i)));
    }
  }

  function toggleRow(index: number) {
    const next = new Set(selected);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    if (!controlled) setInternalSelected(next);
    onRowSelect?.(index, !selected.has(index));
  }

  return (
    <div className={['table-wrapper', className].filter(Boolean).join(' ')} data-size={size}>
      <table className="table">
        <thead>
          <tr className="table__header-row">
            {selectable && (
              <th className="table__th table__th--check">
                <Checkbox
                  checked={isIndeterminate ? 'indeterminate' : isAllSelected}
                  onChange={toggleAll}
                  aria-label="전체 선택"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className="table__th"
                style={{
                  width: col.width,
                  textAlign: col.align ?? 'left',
                }}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && emptyState && (
            <tr>
              <td
                className="table__td table__td--empty"
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                {emptyState}
              </td>
            </tr>
          )}
          {data.map((row, rowIndex) => {
            const key = getRowKey(row, rowIndex, rowKey);
            const isSelected = selected.has(rowIndex);
            return (
              <tr
                key={key}
                className="table__row"
                data-selected={isSelected || undefined}
              >
                {selectable && (
                  <td className="table__td table__td--check">
                    <Checkbox
                      checked={isSelected}
                      onChange={() => toggleRow(rowIndex)}
                      aria-label={`행 ${rowIndex + 1} 선택`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="table__td"
                    style={{ textAlign: col.align ?? 'left' }}
                  >
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : (row[col.key] as React.ReactNode) ?? '—'}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
