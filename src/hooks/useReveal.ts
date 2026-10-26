'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight IntersectionObserver hook for scroll-reveal animations.
 *
 * - Observes a single element
 * - Once revealed, unobserves (animate once)
 * - Applies `will-change` during animation, removes after
 * - Pauses when the tab is hidden (visibility API)
 *
 * ~350B gzipped.
 */
export function useReveal(options?: {
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        // Skip if tab is hidden
        if (document.visibilityState === 'hidden') return;

        setRevealed(true);
        el.classList.add('is-revealed');

        // Apply will-change for animation performance
        el.style.willChange = 'transform, opacity';

        // Clean up will-change after all animations complete
        const cleanup = () => {
          el.style.willChange = 'auto';
          // Also clean children
          const children = el.children;
          for (let i = 0; i < children.length; i++) {
            (children[i] as HTMLElement).style.willChange = 'auto';
          }
        };

        // Use animationend on the last child, or fallback to timeout
        const lastChild = el.lastElementChild as HTMLElement | null;
        if (lastChild) {
          lastChild.addEventListener('animationend', cleanup, { once: true });
        }
        // Safety timeout (max stagger + animation duration)
        setTimeout(cleanup, 2000);

        observer.unobserve(el);
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -10% 0px',
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [revealed, options?.threshold, options?.rootMargin]);

  return { ref, revealed };
}
