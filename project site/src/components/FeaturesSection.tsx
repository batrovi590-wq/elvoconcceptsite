import { features } from '../data/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './FeaturesSection.css';

export function FeaturesSection() {
  const gridRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="advantages" className="features" aria-label="Преимущества жилого комплекса">
      <div className="container">
        <hr className="section-divider" />
        <div ref={gridRef} className="features__grid reveal-stagger">
          {features.map((feature) => (
            <article key={feature.lines.join(' ')} className="features__item">
              <h2 className="features__title">
                {feature.lines.map((line) => (
                  <span key={line} className="features__title-line">
                    {line}
                  </span>
                ))}
              </h2>
              <span className="features__rule" aria-hidden="true" />
              <p className="features__text">{feature.text}</p>
            </article>
          ))}
        </div>
        <hr className="section-divider" />
      </div>
    </section>
  );
}