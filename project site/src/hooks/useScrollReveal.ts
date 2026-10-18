import { useEffect, useRef } from 'react';

interface ScrollRevealOptions {
  /** Доля пересечения, при которой элемент считается видимым */
  threshold?: number;
  /** Задержка появления, мс */
  delay?: number;
}

/**
 * Добавляет элементу класс is-visible, когда он входит в зону экрана.
 * Уважает prefers-reduced-motion и не скрывает контент, если
 * IntersectionObserver недоступен.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {},
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    if (options.delay) {
      element.style.setProperty('--reveal-delay', `${options.delay}ms`);
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      element.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { threshold: options.threshold ?? 0, rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
    // Опции фиксированы на этапе вызова; пересоздание наблюдателя не требуется.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}