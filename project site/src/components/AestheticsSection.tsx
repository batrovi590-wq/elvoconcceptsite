import { aesthetics } from '../data/siteContent';
import { PillButton } from './PillButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './AestheticsSection.css';

export function AestheticsSection() {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const cardRef = useScrollReveal<HTMLElement>();
  const textRef = useScrollReveal<HTMLParagraphElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="aesthetics" className="aesthetics" aria-labelledby="aesthetics-title">
      <div className="container aesthetics__layout">
        <h2 ref={titleRef} className="aesthetics__title reveal" id="aesthetics-title">
          {aesthetics.titleLines.map((line) => (
            <span key={line} className="aesthetics__title-line">
              {line}
            </span>
          ))}
        </h2>
        <figure ref={cardRef} className="aesthetics__card reveal">
          <img src={aesthetics.photo} alt={aesthetics.photoAlt} loading="lazy" />
        </figure>
        <p ref={textRef} className="aesthetics__paragraph reveal">
          {aesthetics.text}
        </p>
        <div ref={ctaRef} className="aesthetics__cta reveal">
          <PillButton href={aesthetics.ctaHref} arrow className="aesthetics__cta-button">
            {aesthetics.ctaLabel}
          </PillButton>
        </div>
      </div>

      {/* Разделитель из макета: тонкая линия на всю контентную полосу */}
      <div className="container">
        <hr className="section-divider aesthetics__divider" />
      </div>
    </section>
  );
}
