import type { Locale } from '@/types';
import { getTranslations } from '@/lib/i18n';
import { Reveal } from '@/components/public/Reveal';

interface ApproachProps {
  locale: Locale;
}

export function Approach({ locale }: ApproachProps) {
  const t = getTranslations(locale);
  
  const steps = [
    { num: '01', label: t.approach.steps.understand },
    { num: '02', label: t.approach.steps.plan },
    { num: '03', label: t.approach.steps.build },
    { num: '04', label: t.approach.steps.deliver },
  ];

  return (
    <section className="py-20 md:py-32">
      <Reveal className="container-portfolio" stagger staggerStep={100}>
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <p className="text-label text-subtle mb-3">003</p>
          <h2 className="heading-section text-foreground">{t.approach.heading}</h2>
        </div>

        {/* Steps with connecting lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.num} className="relative">
              <div className="mb-4 md:mb-6">
                <span className="text-label text-accent">{step.num}</span>
              </div>
              <p className="text-lg md:text-xl text-foreground font-medium">
                {step.label}
              </p>
              {/*
               * Connecting line — draws in on reveal via CSS animation.
               * transform-origin is set in CSS for RTL correctness:
               *   LTR: origin-right → draws from right to left
               *   RTL: origin-left  → draws from left to right
               */}
              {index < steps.length - 1 && (
                <div
                  className="approach-line hidden md:block absolute top-6 end-0 w-1/2 border-t border-border"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
