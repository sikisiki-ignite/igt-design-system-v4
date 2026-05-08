import { useState, useRef, useCallback } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Icon } from '../Icon/Icon'
import './DatePicker.css'

/* ── helpers ── */

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function startDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function formatDate(year: number, month: number, day: number) {
  const mm = String(month + 1).padStart(2, '0')
  const dd = String(day).padStart(2, '0')
  return `${year}.${mm}.${dd}`
}

function parseDate(str: string) {
  const m = /^(\d{4})\.(\d{2})\.(\d{2})$/.exec(str)
  if (!m) return null
  const year = parseInt(m[1])
  const month = parseInt(m[2]) - 1
  const day = parseInt(m[3])
  if (month < 0 || month > 11 || day < 1 || day > daysInMonth(year, month)) return null
  return { year, month, day }
}

function isSameDay(a: DateTuple | null, b: DateTuple | null) {
  if (!a || !b) return false
  return a.year === b.year && a.month === b.month && a.day === b.day
}

function dateToMs(d: DateTuple) {
  return new Date(d.year, d.month, d.day).getTime()
}

type DateTuple = { year: number; month: number; day: number }

/* ── segment input for YYYY.MM.DD ── */

interface DateSegmentInputProps {
  value: string
  placeholder: string
  disabled?: boolean
  readOnly?: boolean
  'data-size': 'md' | 'lg'
}

function DateSegmentInput({ value, placeholder, disabled, readOnly, ...rest }: DateSegmentInputProps) {
  return (
    <span className="dp__date-text" {...rest}>
      {value || <span className="dp__placeholder">{placeholder}</span>}
    </span>
  )
}

/* ── calendar ── */

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']

interface CalendarProps {
  viewYear: number
  viewMonth: number
  selected: DateTuple | null
  rangeStart: DateTuple | null
  rangeEnd: DateTuple | null
  hoveredDate: DateTuple | null
  isRange: boolean
  onSelectDay: (d: DateTuple) => void
  onHoverDay: (d: DateTuple | null) => void
  onPrevMonth: () => void
  onNextMonth: () => void
}

function Calendar({
  viewYear, viewMonth, selected, rangeStart, rangeEnd, hoveredDate,
  isRange, onSelectDay, onHoverDay, onPrevMonth, onNextMonth
}: CalendarProps) {
  const totalDays = daysInMonth(viewYear, viewMonth)
  const startDay = startDayOfMonth(viewYear, viewMonth)
  const today = new Date()
  const todayTuple = { year: today.getFullYear(), month: today.getMonth(), day: today.getDate() }

  const cells: Array<DateTuple | null> = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push({ year: viewYear, month: viewMonth, day: d })

  const effectiveRangeEnd = isRange && rangeStart && !rangeEnd && hoveredDate ? hoveredDate : rangeEnd
  const rangeMs = rangeStart && effectiveRangeEnd
    ? [dateToMs(rangeStart), dateToMs(effectiveRangeEnd)].sort((a, b) => a - b)
    : null

  function getDayClass(cell: DateTuple): string {
    const classes = ['dp__day']
    const ms = dateToMs(cell)
    const isToday = isSameDay(cell, todayTuple)
    const isSelected = isRange
      ? isSameDay(cell, rangeStart) || isSameDay(cell, rangeEnd)
      : isSameDay(cell, selected)
    const isInRange = rangeMs ? ms > rangeMs[0] && ms < rangeMs[1] : false
    const isRangeEdge = rangeMs ? ms === rangeMs[0] || ms === rangeMs[1] : false

    if (isToday) classes.push('dp__day--today')
    if (isSelected || isRangeEdge) classes.push('dp__day--selected')
    if (isInRange) classes.push('dp__day--in-range')
    return classes.join(' ')
  }

  return (
    <div className="dp__calendar">
      <div className="dp__calendar-header">
        <button type="button" className="dp__nav-btn" onClick={onPrevMonth} aria-label="이전 달">
          <Icon name="chevronLeftOutline2dp" size={16} aria-hidden />
        </button>
        <span className="dp__month-label">{viewYear}년 {MONTHS[viewMonth]}</span>
        <button type="button" className="dp__nav-btn" onClick={onNextMonth} aria-label="다음 달">
          <Icon name="chevronRightOutline2dp" size={16} aria-hidden />
        </button>
      </div>
      <div className="dp__weekdays">
        {WEEKDAYS.map(d => <span key={d} className="dp__weekday">{d}</span>)}
      </div>
      <div className="dp__days">
        {cells.map((cell, i) =>
          cell ? (
            <button
              key={i}
              type="button"
              className={getDayClass(cell)}
              onClick={() => onSelectDay(cell)}
              onMouseEnter={() => onHoverDay(cell)}
              onMouseLeave={() => onHoverDay(null)}
              aria-label={`${cell.year}년 ${cell.month + 1}월 ${cell.day}일`}
            >
              {cell.day}
            </button>
          ) : (
            <span key={i} className="dp__day dp__day--empty" />
          )
        )}
      </div>
    </div>
  )
}

/* ── DatePicker ── */

export interface DatePickerProps {
  variation?: 'singleDate' | 'range'
  size?: 'md' | 'lg'
  value?: string
  endValue?: string
  defaultValue?: string
  defaultEndValue?: string
  label?: string
  message?: string
  invalid?: boolean
  disabled?: boolean
  readOnly?: boolean
  placeholder?: string
  endPlaceholder?: string
  onChange?: (value: string) => void
  onRangeChange?: (start: string, end: string) => void
  className?: string
}

export function DatePicker({
  variation = 'singleDate',
  size = 'lg',
  value,
  endValue,
  defaultValue,
  defaultEndValue,
  label,
  message,
  invalid = false,
  disabled = false,
  readOnly = false,
  placeholder = 'YYYY.MM.DD',
  endPlaceholder = 'YYYY.MM.DD',
  onChange,
  onRangeChange,
  className,
}: DatePickerProps) {
  const isRange = variation === 'range'
  const isControlled = value !== undefined
  const isRangeControlled = endValue !== undefined

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [internalEndValue, setInternalEndValue] = useState(defaultEndValue ?? '')
  const [open, setOpen] = useState(false)
  const [hoveredDate, setHoveredDate] = useState<DateTuple | null>(null)

  const displayValue = isControlled ? (value ?? '') : internalValue
  const displayEndValue = isRangeControlled ? (endValue ?? '') : internalEndValue

  const [rangePhase, setRangePhase] = useState<'start' | 'end'>('start')
  const [pendingRangeStart, setPendingRangeStart] = useState<string | null>(null)

  const effectiveStartDisplay = isRange && pendingRangeStart ? pendingRangeStart : displayValue
  const parsedStart = parseDate(effectiveStartDisplay)
  const parsedEnd = parseDate(displayEndValue)

  const today = new Date()
  const [viewYear, setViewYear] = useState(parsedStart?.year ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(parsedStart?.month ?? today.getMonth())

  const prevMonth = useCallback(() => {
    setViewMonth(m => {
      if (m === 0) { setViewYear(y => y - 1); return 11 }
      return m - 1
    })
  }, [])

  const nextMonth = useCallback(() => {
    setViewMonth(m => {
      if (m === 11) { setViewYear(y => y + 1); return 0 }
      return m + 1
    })
  }, [])

  const handleSelectDay = useCallback((d: DateTuple) => {
    const formatted = formatDate(d.year, d.month, d.day)
    if (!isRange) {
      if (!isControlled) setInternalValue(formatted)
      onChange?.(formatted)
      setOpen(false)
    } else {
      if (rangePhase === 'start') {
        if (!isControlled) setInternalValue(formatted)
        if (!isRangeControlled) setInternalEndValue('')
        onChange?.(formatted)
        setPendingRangeStart(formatted)
        setRangePhase('end')
      } else {
        const effectiveStart = pendingRangeStart ?? displayValue
        const startMs = parseDate(effectiveStart) ? dateToMs(parseDate(effectiveStart)!) : 0
        const selectedMs = dateToMs(d)
        if (selectedMs < startMs) {
          if (!isControlled) { setInternalValue(formatted); setInternalEndValue(effectiveStart) }
          onRangeChange?.(formatted, effectiveStart)
        } else {
          if (!isControlled) setInternalValue(effectiveStart)
          if (!isRangeControlled) setInternalEndValue(formatted)
          onRangeChange?.(effectiveStart, formatted)
        }
        setPendingRangeStart(null)
        setRangePhase('start')
        setOpen(false)
      }
    }
  }, [isRange, isControlled, isRangeControlled, rangePhase, pendingRangeStart, parsedStart, displayValue, onChange, onRangeChange])

  const iconSize = size === 'lg' ? 20 : 18

  return (
    <div
      className={['dp', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variation={variation}
      data-invalid={invalid || undefined}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      {label && (
        <span className="dp__label" data-size={size}>
          {label}
          {invalid && <span className="dp__label-error"> *</span>}
        </span>
      )}

      <Popover.Root
      open={open}
      onOpenChange={disabled || readOnly ? undefined : (next) => {
        if (next && isRange) { setRangePhase('start'); setPendingRangeStart(null) }
        setOpen(next)
      }}
    >
        <Popover.Trigger asChild>
          <button
            type="button"
            className="dp__field"
            data-size={size}
            data-invalid={invalid || undefined}
            data-disabled={disabled || undefined}
            data-readonly={readOnly || undefined}
            disabled={disabled}
            aria-haspopup="dialog"
          >
            <div className="dp__date-area">
              <DateSegmentInput
                value={effectiveStartDisplay}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                data-size={size}
              />
              {isRange && (
                <>
                  <span className="dp__range-sep">~</span>
                  <DateSegmentInput
                    value={displayEndValue}
                    placeholder={endPlaceholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    data-size={size}
                  />
                </>
              )}
            </div>
            <span
              className="dp__trailing-action"
              data-size={size}
              data-disabled={disabled || undefined}
              aria-hidden="true"
            >
              <Icon name="calendarSolid" size={iconSize} />
            </span>
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="dp__popover" sideOffset={4} align="start">
            <Calendar
              viewYear={viewYear}
              viewMonth={viewMonth}
              selected={parsedStart}
              rangeStart={parsedStart}
              rangeEnd={parsedEnd}
              hoveredDate={hoveredDate}
              isRange={isRange}
              onSelectDay={handleSelectDay}
              onHoverDay={setHoveredDate}
              onPrevMonth={prevMonth}
              onNextMonth={nextMonth}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {message && (
        <p className="dp__message">{message}</p>
      )}
    </div>
  )
}
