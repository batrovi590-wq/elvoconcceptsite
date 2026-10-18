# ЖК «Белогорье» — концепт-сайт

Одностраничный концептуальный лендинг жилого комплекса бизнес-класса в Сочи. Портфолио-концепт ELVO Digital Studio: сайт не связан с реальными продажами недвижимости, а форма заявки работает в демонстрационном режиме.

Дизайн сверстан по PDF-макету из `references/landing-design.pdf` (канва 1440 px), форма заявки — по `references/application-form-design.pdf`.

## Стек

- React 18 + Vite 5 + TypeScript (strict, без `any`)
- Обычный CSS с дизайн-токенами (`src/styles/tokens.css`), без CSS-фреймворков и UI-библиотек
- Google Fonts: Cormorant Garamond (заголовки) + Manrope (текст)
- Иконки — inline SVG. Бэкенд, API и ключи не используются

## Команды

> В PowerShell со строгой политикой выполнения используйте `npm.cmd` вместо `npm`.

```bash
npm install        # установка зависимостей
npm run dev        # локальная разработка (http://localhost:5173)
npm run build      # проверка типов (tsc --noEmit) + production-сборка в dist/
npm run preview    # предпросмотр production-сборки (http://localhost:4173)
node scripts/optimize-images.mjs  # одноразовая оптимизация копий изображений в WebP
```

## Структура

```text
index.html                # meta/OG, favicon, шрифты
public/images/            # оригинальные изображения (не изменяются)
public/images/optimized/  # WebP-копии для галереи (генерируются скриптом)
references/               # PDF-макеты и превью — источник истины дизайна
scripts/optimize-images.mjs
src/
  main.tsx                # точка входа
  App.tsx                 # композиция секций + состояние модалки
  data/siteContent.ts     # все тексты, навигация, слайды
  hooks/                  # useScrollReveal, useLockBodyScroll
  styles/                 # tokens.css, global.css
  components/             # Header, Hero, FeaturesSection, PhilosophySection,
                          # AestheticsSection, InteriorCarousel, ContactModal,
                          # Footer, PillButton, icons
```

## Секции лендинга

Header (sticky) → Hero → Преимущества (3 колонки) → Философия проекта (фото + 2 карточки) → Эстетика (текст + фото) → Галерея интерьеров (5 слайдов, стрелки/точки/клавиатура) → Footer. Кнопка «Связаться с нами» открывает модальную форму.

## Форма заявки

Демонстрационный режим: локальная валидация имени и телефона, после отправки показывается статус «данные не отправлены». Данные не отправляются на сервер, не сохраняются и не анализируются.

## Деплой на Vercel

Вариант 1 — через Git: загрузите репозиторий на GitHub, в Vercel нажмите «Import Project», фреймворк определится автоматически (Vite): Build Command `npm run build`, Output Directory `dist`.

Вариант 2 — через CLI: `npm i -g vercel` и `vercel --prod` из корня проекта.
