import Link from 'next/link';
import ShareButtons from '../_components/ShareButtons';

export const metadata = {
  title: 'Наші сервіси — SaveGood, Veo Studio та Telegram-боти',
  description: 'Усі сервіси в одному місці: SaveGood, Veo Studio, ДЗЛегко, AI Assistant та AI Video Bot.',
  alternates: { canonical: 'https://savegood.store/nashi-servisy' },
  openGraph: {
    title: 'Наші сервіси | SaveGood',
    description: 'SaveGood, Veo Studio, ДЗЛегко, AI Assistant та AI Video Bot в одному каталозі.',
    url: 'https://savegood.store/nashi-servisy',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/savegood', width: 1200, height: 630 }],
  },
};

const services = [
  {
    icon: '🌍',
    name: 'SaveGood',
    text: 'Подорожі, корисні ресурси, пошук пропозицій та сервіси для українців у Європі.',
    href: '/',
    label: 'Відкрити SaveGood',
  },
  {
    icon: '🎥',
    name: 'Veo Studio',
    text: 'Веб-сервіс для створення AI-відео з тексту або зображень за допомогою підтримуваних відеомоделей.',
    href: 'https://getveostudio.app/?utm_source=savegood.store&utm_medium=referral&utm_campaign=services',
    label: 'Відкрити Veo Studio',
    external: true,
  },
  {
    icon: '📚',
    name: 'ДЗЛегко',
    text: 'Telegram-бот для батьків школярів 5–9 класів: фото домашнього завдання, відповідь і пояснення.',
    href: '/dzlegko-telegram-bot',
    label: 'Дізнатися про ДЗЛегко',
  },
  {
    icon: '🤖',
    name: 'AI Assistant',
    text: 'AI-помічник у Telegram для повсякденних текстових і голосових запитів.',
    href: '/ai-assistant-telegram-bot',
    label: 'Відкрити сторінку AI Assistant',
  },
  {
    icon: '🎬',
    name: 'AI Video Bot',
    text: 'Простий спосіб запускати короткі AI-відеогенерації безпосередньо в Telegram.',
    href: '/video-bot',
    label: 'Відкрити сторінку Video Bot',
  },
];

export default function ServicesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://savegood.store/nashi-servisy#page',
        url: 'https://savegood.store/nashi-servisy',
        name: 'Наші сервіси',
        description: 'Усі сервіси SaveGood, Veo Studio та Telegram-боти в одному місці.',
        isPartOf: { '@id': 'https://savegood.store/#website' },
        breadcrumb: { '@id': 'https://savegood.store/nashi-servisy#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://savegood.store/nashi-servisy#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SaveGood', item: 'https://savegood.store/' },
          { '@type': 'ListItem', position: 2, name: 'Наші сервіси', item: 'https://savegood.store/nashi-servisy' },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Сервіси SaveGood',
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: service.name,
          url: service.external
            ? 'https://getveostudio.app/'
            : 'https://savegood.store' + service.href,
        })),
      },
    ],
  };

  return (
    <main style={{ maxWidth: '1040px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Arial, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', display: 'flex', gap: '8px', fontSize: '14px', opacity: 0.8 }}>
        <Link href="/">Головна</Link>
        <span>›</span>
        <span>Наші сервіси</span>
      </nav>

      <section className="panel">
        <span className="eyebrow">SaveGood</span>
        <h1 style={{ marginTop: '10px', fontSize: 'clamp(36px, 6vw, 58px)', lineHeight: 1.08 }}>Наші сервіси</h1>
        <p style={{ marginTop: '20px', fontSize: '19px', lineHeight: 1.65, maxWidth: '760px' }}>
          Усі наші веб-сервіси та Telegram-боти зібрані на одній сторінці. Оберіть потрібний інструмент і перейдіть прямо до нього.
        </p>
      </section>

      <section className="cards" style={{ marginTop: '30px' }}>
        {services.map((service) => (
          <article className="card" key={service.name} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-icon">{service.icon}</div>
            <h2>{service.name}</h2>
            <p style={{ lineHeight: 1.6, flexGrow: 1 }}>{service.text}</p>
            {service.external ? (
              <a className="primary" href={service.href} target="_blank" rel="noopener noreferrer">
                {service.label}
              </a>
            ) : (
              <Link className="primary" href={service.href}>{service.label}</Link>
            )}
          </article>
        ))}
      </section>

      <section style={{ marginTop: '38px' }}>
        <h2>Що обрати</h2>
        <p style={{ lineHeight: 1.65 }}>
          Для AI-відео з веб-інтерфейсом підійде Veo Studio, для швидкого запуску в Telegram — AI Video Bot.
          Для допомоги з домашнім завданням використовуйте ДЗЛегко, а для загальних AI-запитів — AI Assistant.
        </p>
      </section>

      <ShareButtons title="Наші сервіси SaveGood" />
    </main>
  );
}
