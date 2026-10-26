'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * When true, direct children get staggered animation delays
   * via --delay CSS custom property based on their index.
   */
  stagger?: boolean;
  /** Base delay in ms for stagger (default: 0) */
  staggerBase?: number;
  /** Step between children in ms (default: 100) */
  staggerStep?: number;
}

/**
 * Reveal wrapper — adds scroll-triggered entrance animation.
 *
 * Uses IntersectionObserver to toggle `.is-revealed` class once.
 * All animation is CSS-driven; JS only toggles the class.
 *
 * For staggered children, pass `stagger` and children will receive
 * `--delay` custom properties based on their index.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  staggerBase = 0,
  staggerStep = 100,
}: RevealProps) {
  const { ref } = useReveal();

  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      {...(stagger && { 'data-stagger': '' })}
    >
      {stagger
        ? applyStaggerDelays(children, staggerBase, staggerStep)
        : children}
    </div>
  );
}

/**
 * Wrap each child in a div with --delay CSS custom property for stagger.
 * This avoids the need for React.cloneElement and type issues.
 * Only wraps valid React elements; passes through strings/nulls.
 */
function applyStaggerDelays(
  children: React.ReactNode,
  base: number,
  step: number
): React.ReactNode {
  if (!Array.isArray(children)) {
    return children;
  }

  return children.map((child, index) => {
    // Skip null/undefined/strings
    if (!child || typeof child !== 'object') {
      return child;
    }

    const delay = base + index * step;
    
    // Wrap in a div with the --delay custom property
    return (
      <div
        key={index}
        style={{ '--delay': `${delay}ms` } as React.CSSProperties}
      >
        {child}
      </div>
    );
  });
}
