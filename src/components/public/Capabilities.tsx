import type { Locale, Service } from '@/types';
import { getTranslations } from '@/lib/i18n';

interface CapabilitiesProps {
  locale: Locale;
  services: Service[];
}

export function Capabilities({ locale, services }: CapabilitiesProps) {
  const t = getTranslations(locale);

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container-portfolio">
        {/* Section Header */}
        <div className="mb-12 md:mb-20">
          <p className="text-label text-subtle mb-3">002</p>
          <h2 className="heading-section text-foreground">{t.capabilities.heading}</h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => {
            const title = locale === 'ar' && service.title_ar ? service.title_ar : service.title_en;
            const description = locale === 'ar' && service.description_ar ? service.description_ar : service.description_en;

            return (
              <div
                key={service.id}
                className="bg-surface p-8 md:p-12 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <span className="text-label text-subtle">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl text-foreground font-medium mb-4">
                  {title}
                </h3>
                
                {description && (
                  <p className="text-small text-muted leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
