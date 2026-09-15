import Link from 'next/link';
import ShareButtons from '../_components/ShareButtons';

export const metadata = {
  title: 'Про SaveGood — як працює сайт і наші сервіси',
  description: 'SaveGood — незалежний онлайн-проєкт з корисними сервісами, інформаційними сторінками та власними AI-інструментами.',
  alternates: { canonical: 'https://savegood.store/pro-savegood' },
  openGraph: {
    title: 'Про SaveGood',
    description: 'Що таке SaveGood, які сервіси ми розвиваємо та що важливо знати користувачам.',
    url: 'https://savegood.store/pro-savegood',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/savegood', width: 1200, height: 630 }],
  },
};

export default function AboutSaveGood() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://savegood.store/pro-savegood#page',
        url: 'https://savegood.store/pro-savegood',
        name: 'Про SaveGood',
        description: 'Інформація про незалежний онлайн-проєкт SaveGood та пов’язані сервіси.',
        isPartOf: { '@id': 'https://savegood.store/#website' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SaveGood', item: 'https://savegood.store/' },
          { '@type': 'ListItem', position: 2, name: 'Про SaveGood', item: 'https://savegood.store/pro-savegood' },
        ],
      },
    ],
  };

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Arial, sans-serif' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav aria-label="Breadcrumb" style={{ marginBottom: '20px', display: 'flex', gap: '8px', fontSize: '14px', opacity: 0.8 }}>
        <Link href="/">Головна</Link><span>›</span><span>Про SaveGood</span>
      </nav>

      <section className="panel">
        <span className="eyebrow">Про проєкт</span>
        <h1 style={{ marginTop: '10px', fontSize: 'clamp(36px, 6vw, 58px)', lineHeight: 1.08 }}>Про SaveGood</h1>
        <p style={{ marginTop: '20px', fontSize: '19px', lineHeight: 1.65 }}>
          SaveGood — незалежний онлайн-проєкт, який поєднує корисні сторінки для українців у Європі, сервіси для подорожей та власні AI-інструменти.
        </p>
      </section>

      <section className="cards" style={{ marginTop: '30px' }}>
        <article className="card">
          <div className="card-icon">🌍</div>
          <h2>Корисна інформація</h2>
          <p>Ми збираємо посилання на офіційні ресурси ЄС та практичні онлайн-сервіси. SaveGood не є офіційним сайтом ЄС або державним органом.</p>
        </article>
        <article className="card">
          <div className="card-icon">🤖</div>
          <h2>Власні AI-сервіси</h2>
          <p>До екосистеми входять Veo Studio, ДЗЛегко, AI Assistant та AI Video Bot. Можливості кожного сервісу описані на його окремій сторінці.</p>
        </article>
        <article className="card">
          <div className="card-icon">🔗</div>
          <h2>Зовнішні сервіси</h2>
          <p>Деякі кнопки ведуть на сайти партнерів або сторонніх сервісів. Бронювання, покупки та оплата на таких сайтах відбуваються за їхніми правилами.</p>
        </article>
      </section>

      <section style={{ marginTop: '36px' }}>
        <h2>Що важливо знати про AI</h2>
        <p style={{ fontSize: '17px', lineHeight: 1.65 }}>
          AI-відповіді та згенерований контент можуть містити помилки. Для навчальних, юридичних, медичних, фінансових та інших важливих рішень перевіряйте факти у відповідних надійних або офіційних джерелах.
        </p>
      </section>

      <section style={{ marginTop: '36px' }}>
        <h2>Наші проєкти</h2>
        <nav style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
          <Link href="/nashi-servisy">Усі сервіси</Link>
          <Link href="/dzlegko-telegram-bot">ДЗЛегко</Link>
          <Link href="/ai-assistant-telegram-bot">AI Assistant</Link>
          <Link href="/video-bot">AI Video Bot</Link>
          <a href="https://getveostudio.app/?utm_source=savegood.store&utm_medium=referral&utm_campaign=about" target="_blank" rel="noopener noreferrer">Veo Studio</a>
        </nav>
      </section>

      <ShareButtons title="Про SaveGood" />
    </main>
  );
}
