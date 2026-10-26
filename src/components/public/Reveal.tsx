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
 * Clone children and inject --delay CSS custom property for stagger.
 * Uses React.cloneElement to avoid wrapping in extra divs.
 * Only operates on valid React elements; passes through strings/nulls.
 */
function applyStaggerDelays(
  children: React.ReactNode,
  base: number,
  step: number
): React.ReactNode {
  let index = 0;
  
  const processChild = (child: React.ReactNode): React.ReactNode => {
    if (!child || typeof child !== 'object' || !('type' in child)) {
      return child;
    }
    
    const delay = base + index * step;
    index++;
    
    // Use React.cloneElement to inject --delay without wrapping
    return {
      ...child,
      props: {
        ...child.props,
        style: {
          ...child.props.style,
          '--delay': `${delay}ms`,
        },
      },
    };
  };
  
  return Array.isArray(children)
    ? children.map(processChild)
    : processChild(children);
}
