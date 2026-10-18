import type { ReactNode } from 'react';
import { ArrowRightIcon } from './icons';
import './PillButton.css';

interface PillButtonProps {
  children: ReactNode;
  /** Если задан — рендерится ссылка-якорь, иначе кнопка */
  href?: string;
  onClick?: () => void;
  className?: string;
  /** Показать длинную стрелку справа */
  arrow?: boolean;
  type?: 'button' | 'submit';
}

/**
 * Тёмно-зелёная pill-кнопка макета: скругление-капсула,
 * стрелка справа, мягкий hover с подъёмом.
 */
export function PillButton({
  children,
  href,
  onClick,
  className,
  arrow = false,
  type = 'button',
}: PillButtonProps) {
  const cls = className ? `pill-button ${className}` : 'pill-button';
  const content = (
    <>
      <span className="pill-button__label">{children}</span>
      {arrow && <ArrowRightIcon className="pill-button__arrow" />}
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick}>
      {content}
    </button>
  );
}