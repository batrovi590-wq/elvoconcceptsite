import { hero } from '../data/siteContent';
import { PillButton } from './PillButton';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Hero.css';

export function Hero() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="hero" className="hero" aria-label="ЖК «Белогорье» — главный экран">
      <div className="container">
        <div ref={revealRef} className="hero__card reveal">
          <img className="hero__photo" src={hero.photo} alt={hero.photoAlt} />

          <div className="hero__content">
            <p className="hero__eyebrow">{hero.eyebrow}</p>
            <h1 className="hero__title">
              {hero.titleLines.map((line) => (
                <span key={line} className="hero__title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero__lead">
              {hero.leadLines.map((line) => (
                <span key={line} className="hero__lead-line">
                  {line}
                </span>
              ))}
            </p>
            <PillButton href={hero.ctaHref} arrow className="hero__cta">
              {hero.ctaLabel}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}