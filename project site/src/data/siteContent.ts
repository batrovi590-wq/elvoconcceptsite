/**
 * Все тексты и медиа лендинга ЖК «Белогорье».
 * Источник: PROJECT_BRIEF.md + references/landing-design.pdf.
 * Никаких выдуманных фактов о реальном ЖК — это концепт ELVO Digital Studio.
 */

const publicBase = import.meta.env.BASE_URL;

export interface NavItem {
  label: string;
  href: string;
}

export interface MultiLineText {
  lines: string[];
}

export interface Feature extends MultiLineText {
  text: string;
}

export interface PhilosophyCard {
  titleLines: string[];
  /** Короткие строки-перечисления (карточка 1) */
  lines?: string[];
  /** Абзац (карточка 2) */
  text?: string;
}

export interface Slide {
  src: string;
  alt: string;
  caption: string;
}

export const brand = {
  name: 'БЕЛОГОРЬЕ',
  tagline: 'жилой комплекс · сочи',
};

export const navItems: NavItem[] = [
  { label: 'О проекте', href: '#advantages' },
  { label: 'Философия', href: '#philosophy' },
  { label: 'Интерьеры', href: '#interiors' },
];

export const contactButtonLabel = 'Связаться с нами';

export const hero = {
  eyebrow: 'Современная жилая архитектура',
  titleLines: ['Пространство,', 'в котором хочется', 'остаться...'],
  leadLines: ['Природное окружение', 'и новый взгляд на жизнь', 'у Чёрного моря.'],
  ctaLabel: 'Познакомиться с проектом',
  ctaHref: '#philosophy',
  photo: `${publicBase}images/hero-complex.jpg`,
  photoAlt: 'Вид на жилой комплекс «Белогорье» с террасами на фоне гор и Чёрного моря',
};

export const features: Feature[] = [
  {
    lines: ['Архитектура', 'в гармонии с природой'],
    text: 'Натуральные материалы, выразительные формы и внимание к деталям.',
  },
  {
    lines: ['Пространство', 'и свет'],
    text: 'Продуманные планировки и панорамные виды.',
  },
  {
    lines: ['Комфорт', 'в деталях'],
    text: 'Эстетика, которая чувствуется в мелочах.',
  },
];

export const philosophy = {
  heading: 'Философия проекта',
  photo: `${publicBase}images/philosophy-terrace.jpg`,
  photoAlt: 'Терраса с мягкой мебелью и видом на море и горы',
  cards: [
    {
      titleLines: ['Меньше шума.', 'Больше жизни.'],
      lines: ['Свой ритм.', 'Своё пространство.', 'Свои правила.'],
    },
    {
      titleLines: ['Ближе к природе.', 'Ближе к себе.'],
      text: 'Архитектура, которая оставляет главное — ощущение дома.',
    },
  ] as PhilosophyCard[],
};

export const aesthetics = {
  titleLines: ['Продуманная эстетика', 'для каждого', 'вашего дня.'],
  text: 'Натуральные материалы, мягкие оттенки и выразительные фактуры создают гармоничный интерьер с атмосферой уюта, лёгкости и спокойствия.',
  ctaLabel: 'Смотреть интерьеры',
  ctaHref: '#interiors',
  photo: `${publicBase}images/architecture-card.jpg`,
  photoAlt: 'Террасы жилого комплекса среди средиземноморской зелени у побережья',
};

export const interiorSlider = {
  heading: 'Место, где всё становится чуть спокойнее',
  text: 'Белогорье — концепция жилого пространства, в котором архитектура не спорит с природой. Свет, фактура материалов и открытые виды создают ощущение гармонии и помогают переключиться на собственный ритм.',
  slides: [
    {
      src: `${publicBase}images/interior-main.jpg`,
      alt: 'Интерьер гостиной с панорамными окнами и видом на море',
      caption: 'Интерьер гостиной',
    },
    {
      src: `${publicBase}images/optimized/gallery-terrace-view.webp`,
      alt: 'Вид с террасы на побережье и горы',
      caption: 'Терраса с видом на побережье',
    },
    {
      src: `${publicBase}images/optimized/interior-kitchen.webp`,
      alt: 'Тёплая минималистичная кухня с островом и обеденной зоной',
      caption: 'Интерьер кухни-столовой',
    },
  ] as Slide[],
};

export const contactForm = {
  title: 'Мы с вами свяжемся!',
  namePlaceholder: 'Ваше имя',
  phonePlaceholder: 'Номер телефона',
  note: 'Это концептуальная версия сайта ЖК «Белогорье». Форма работает в демонстрационном режиме: данные не отправляются и заявки не принимаются.',
  submitLabel: 'Оставить заявку',
  successMessage: 'Это демонстрационная форма — данные не отправлены.',
};

export const footerContent = {
  brand: 'БЕЛОГОРЬЕ',
  tagline: 'жилой комплекс · сочи',
  creditPrefix: 'концепт- сайт by',
  creditName: 'ELVO Digital Studio',
};