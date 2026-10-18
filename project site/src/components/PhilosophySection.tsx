import { philosophy } from '../data/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './PhilosophySection.css';

export function PhilosophySection() {
  const headingRef = useScrollReveal<HTMLHeadingElement>();
  const layoutRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="philosophy" className="philosophy" aria-labelledby="philosophy-heading">
      <div className="container">
        <h2 ref={headingRef} id="philosophy-heading" className="philosophy__heading reveal">
          {philosophy.heading}
        </h2>
        <div ref={layoutRef} className="philosophy__layout reveal-stagger">
          <div className="philosophy__photo-wrap">
            <img
              className="philosophy__photo"
              src={philosophy.photo}
              alt={philosophy.photoAlt}
              loading="lazy"
            />
          </div>
          {philosophy.cards.map((card) => (
            <article key={card.titleLines.join(' ')} className="philosophy__card">
              <h3 className="philosophy__card-title">
                {card.titleLines.map((line) => (
                  <span key={line} className="philosophy__card-title-line">
                    {line}
                  </span>
                ))}
              </h3>
              {card.lines ? (
                <ul className="philosophy__card-lines">
                  {card.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="philosophy__card-text">{card.text}</p>
              )}
            </article>
          ))}
        </div>

        {/* Разделитель из макета: тонкая линия на всю контентную полосу */}
        <hr className="section-divider philosophy__divider" />
      </div>
    </section>
  );
}
