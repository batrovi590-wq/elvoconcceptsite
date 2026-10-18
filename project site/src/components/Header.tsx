import { useEffect, useState } from 'react';
import { brand, contactButtonLabel, navItems } from '../data/siteContent';
import { PhoneIcon, BurgerIcon } from './icons';
import './Header.css';

interface HeaderProps {
  /** Открыть модальное окно формы заявки */
  onContactClick?: () => void;
}

export function Header({ onContactClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#hero" className="header__brand" aria-label="ЖК «Белогорье» — вернуться к началу">
          <span className="header__brand-name">{brand.name}</span>
          <span className="header__brand-tagline">{brand.tagline}</span>
        </a>

        <nav className="header__nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="header__nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="header__contact" onClick={onContactClick}>
            <span className="header__contact-icon" aria-hidden="true">
              <PhoneIcon />
            </span>
            <span className="header__contact-text">{contactButtonLabel}</span>
          </button>

          <button
            type="button"
            className="header__burger"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <BurgerIcon open={menuOpen} />
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="header__mobile" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="header__mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}