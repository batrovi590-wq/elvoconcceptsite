import { KeyboardEvent as ReactKeyboardEvent, useState } from 'react';
import { interiorSlider } from '../data/siteContent';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './InteriorCarousel.css';

function ChevronLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InteriorCarousel() {
  const slides = interiorSlider.slides;
  const total = slides.length;
  const [index, setIndex] = useState(0);
  const stageRef = useScrollReveal<HTMLDivElement>();
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const textRef = useScrollReveal<HTMLParagraphElement>();

  const goTo = (next: number) => setIndex(((next % total) + total) % total);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    }
  };

  return (
    <section id="interiors" className="interiors" aria-label="Галерея интерьеров">
      <div className="container interiors__layout">
        <div ref={stageRef} className="interiors__stage reveal">
          <div
            className="interiors__frame"
            role="group"
            aria-roledescription="карусель"
            aria-label="Галерея интерьеров ЖК «Белогорье»"
            onKeyDown={handleKeyDown}
          >
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                className={`interiors__slide${i === index ? ' is-active' : ''}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                draggable={false}
                onError={(event) => {
                  event.currentTarget.classList.add('is-broken');
                }}
              />
            ))}

            <button
              type="button"
              className="interiors__arrow interiors__arrow--prev"
              aria-label="Предыдущий слайд"
              onClick={() => goTo(index - 1)}
            >
              <ChevronLeft />
            </button>

            <div className="interiors__dots" aria-label="Выбор слайда">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  className={`interiors__dot${i === index ? ' is-active' : ''}`}
                  aria-label={`Показать слайд ${i + 1}: ${slide.caption}`}
                  aria-current={i === index ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="interiors__arrow interiors__arrow--next"
              aria-label="Следующий слайд"
              onClick={() => goTo(index + 1)}
            >
              <ChevronRight />
            </button>

            <p className="visually-hidden" aria-live="polite">
              {slides[index].caption}
            </p>
          </div>
        </div>

        <h2 ref={titleRef} className="interiors__title reveal">
          {interiorSlider.heading}
        </h2>

        <p ref={textRef} className="interiors__paragraph reveal">
          {interiorSlider.text}
        </p>
      </div>
    </section>
  );
}
