import React, { useState } from 'react';
import './Accordion.css';

type AccordionSize = 'sm' | 'md' | 'lg';
type AccordionVariation = 'plain' | 'contained';

export interface AccordionProps {
  size?: AccordionSize;
  variation?: AccordionVariation;
  children: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  leadingIcon?: React.ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
}

function ChevronIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AccordionItem({
  title,
  children,
  leadingIcon,
  defaultExpanded = false,
  disabled = false,
}: AccordionItemProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const id = React.useId();

  return (
    <div
      className="accordion__item"
      data-expanded={expanded}
      data-disabled={disabled || undefined}
    >
      <button
        type="button"
        className="accordion__header"
        aria-expanded={expanded}
        aria-controls={`accordion-panel-${id}`}
        disabled={disabled}
        onClick={() => !disabled && setExpanded((v) => !v)}
      >
        {leadingIcon && (
          <span className="accordion__leading-icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span className="accordion__title">{title}</span>
        <span className="accordion__chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>
      <div
        id={`accordion-panel-${id}`}
        className="accordion__panel"
        role="region"
        aria-labelledby={`accordion-header-${id}`}
      >
        <div className="accordion__panel-inner">
          <div className="accordion__body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Accordion({
  size = 'lg',
  variation = 'plain',
  children,
  className,
}: AccordionProps) {
  return (
    <div
      className={['accordion', className].filter(Boolean).join(' ')}
      data-size={size}
      data-variation={variation}
    >
      {children}
    </div>
  );
}
