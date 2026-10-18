import { useEffect, useRef, useState } from 'react';
import { contactForm } from '../data/siteContent';
import { CloseIcon } from './icons';
import { PillButton } from './PillButton';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import './ContactModal.css';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
}

/** Мягкое форматирование российского номера по мере ввода. */
function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) {
    return '';
  }
  let normalized = digits;
  if (normalized[0] === '8') {
    normalized = `7${normalized.slice(1)}`;
  }
  if (normalized[0] !== '7') {
    return raw;
  }
  const rest = normalized.slice(1);
  let result = '+7';
  if (rest.length > 0) {
    result += ` (${rest.slice(0, 3)}`;
  }
  if (rest.length >= 3) {
    result += ')';
  }
  if (rest.length > 3) {
    result += ` ${rest.slice(3, 6)}`;
  }
  if (rest.length > 6) {
    result += `-${rest.slice(6, 8)}`;
  }
  if (rest.length > 8) {
    result += `-${rest.slice(8, 10)}`;
  }
  return result;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [closing, setClosing] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  // Открытие: анимация появления, фокус в первое поле, запоминание открывателя.
  useEffect(() => {
    if (!open) {
      return;
    }
    openerRef.current = document.activeElement as HTMLElement | null;
    setShowSuccess(false);
    setErrors({});
    setName('');
    setPhone('');
    const frame = requestAnimationFrame(() => setRevealed(true));
    const timer = window.setTimeout(() => {
      cardRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    }, 90);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      setRevealed(false);
      openerRef.current?.focus();
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const requestClose = () => {
    if (closing) {
      return;
    }
    setClosing(true);
    window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Пожалуйста, укажите имя (минимум 2 символа).';
    }
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      nextErrors.phone = 'Введите корректный номер телефона, например +7 900 000-00-00.';
    }
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone) {
      setShowSuccess(false);
      return;
    }
    // Демонстрационный режим: данные не отправляются и не сохраняются.
    setShowSuccess(true);
    setName('');
    setPhone('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      requestClose();
      return;
    }
    if (event.key !== 'Tab') {
      return;
    }
    const card = cardRef.current;
    if (!card) {
      return;
    }
    const focusables = Array.from(
      card.querySelectorAll<HTMLElement>('button, input, a[href]'),
    ).filter((element) => !element.hasAttribute('disabled'));
    if (focusables.length === 0) {
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && (active === first || !card.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const overlayClassName = [
    'contact-overlay',
    revealed ? 'is-open' : '',
    closing ? 'is-closing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={overlayClassName}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <div
        ref={cardRef}
        className="contact-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        onKeyDown={handleKeyDown}
      >
        <button
          type="button"
          className="contact-close"
          aria-label="Закрыть окно"
          onClick={requestClose}
        >
          <CloseIcon />
        </button>

        <h2 id="contact-modal-title" className="contact-title">
          {contactForm.title}
        </h2>

        <form className="contact-form" noValidate onSubmit={handleSubmit}>
          <input
            id="contact-name"
            className="contact-field"
            type="text"
            name="name"
            placeholder={contactForm.namePlaceholder}
            value={name}
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((prev) => ({ ...prev, name: undefined }));
            }}
          />
          {errors.name && (
            <p id="contact-name-error" className="contact-error" role="alert">
              {errors.name}
            </p>
          )}

          <input
            id="contact-phone"
            className="contact-field"
            type="tel"
            name="phone"
            inputMode="tel"
            placeholder={contactForm.phonePlaceholder}
            value={phone}
            autoComplete="tel"
            maxLength={20}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            onChange={(event) => {
              setPhone(formatPhone(event.target.value));
              setErrors((prev) => ({ ...prev, phone: undefined }));
            }}
          />
          {errors.phone && (
            <p id="contact-phone-error" className="contact-error" role="alert">
              {errors.phone}
            </p>
          )}

          <div className="contact-note">
            <span className="contact-note-mark" aria-hidden="true" />
            <p className="contact-note-text">{contactForm.note}</p>
          </div>

          <PillButton type="submit" className="contact-submit">
            {contactForm.submitLabel}
          </PillButton>

          {showSuccess && (
            <p className="contact-success" role="status">
              {contactForm.successMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}