'use client';

import { useEffect, useState, useMemo } from 'react';

/**
 * Subtle background animation with floating code symbols and geometric shapes.
 * - Very low opacity (0.03-0.05) for subtlety
 * - Pauses when tab is hidden
 * - Respects prefers-reduced-motion
 * - Pure CSS animations for performance
 */
export function BackgroundAnimation() {
  // Check for reduced motion preference during initial render
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const [isVisible, setIsVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Pause animation when tab is hidden
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [prefersReducedMotion]);

  if (!isVisible) return null;

  return (
    <div className="background-animation" aria-hidden="true">
      {/* Floating code symbols */}
      <div className="bg-element bg-element-1">&lt;/&gt;</div>
      <div className="bg-element bg-element-2">{ }</div>
      <div className="bg-element bg-element-3">( )</div>
      <div className="bg-element bg-element-4">[ ]</div>
      <div className="bg-element bg-element-5">=&gt;</div>
      <div className="bg-element bg-element-6">;</div>
      
      {/* Geometric shapes */}
      <div className="bg-shape bg-shape-1" />
      <div className="bg-shape bg-shape-2" />
      <div className="bg-shape bg-shape-3" />
      <div className="bg-shape bg-shape-4" />
      
      {/* Animated lines */}
      <div className="bg-line bg-line-1" />
      <div className="bg-line bg-line-2" />
      <div className="bg-line bg-line-3" />
    </div>
  );
}
