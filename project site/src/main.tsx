import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';

// Класс-флаг: reveal-анимации применяются только при работающем JS,
// без него весь контент остаётся видимым по умолчанию.
document.documentElement.classList.add('js');

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Не найден элемент #root');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);