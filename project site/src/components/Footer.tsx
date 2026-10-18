import { footerContent } from '../data/siteContent';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <hr className="section-divider" />
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__brand-name">{footerContent.brand}</span>
            <span className="footer__brand-tagline">{footerContent.tagline}</span>
          </div>
          <p className="footer__credit">
            {footerContent.creditPrefix} <strong>{footerContent.creditName}</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}