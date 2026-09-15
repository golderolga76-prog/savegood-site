import Link from 'next/link';
import TrackedLink from './TrackedLink';

export default function SeoLanding({
  eyebrow,
  title,
  description,
  canonical,
  intro,
  bullets,
  secondTitle,
  secondText,
  primaryHref,
  primaryLabel,
  related = [],
  faq = [],
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://savegood.store/#website',
        url: 'https://savegood.store/',
        name: 'SaveGood',
        inLanguage: 'uk',
      },
      {
        '@type': 'WebPage',
        '@id': canonical + '#webpage',
        url: canonical,
        name: title,
        description,
        inLanguage: 'uk',
        isPartOf: { '@id': 'https://savegood.store/#website' },
      },
      {
        '@type': 'FAQPage',
        '@id': canonical + '#faq',
        url: canonical,
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Arial, sans-serif' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="panel">
        <span className="eyebrow">{eyebrow}</span>
        <h1 style={{ marginTop: '10px', fontSize: 'clamp(34px, 6vw, 56px)', lineHeight: 1.08 }}>{title}</h1>
        <p style={{ marginTop: '20px', fontSize: '19px', lineHeight: 1.65 }}>{intro}</p>

        <div className="cards" style={{ marginTop: '28px' }}>
          {bullets.map((item) => (
            <article className="card" key={item}>
              <div className="card-icon">✓</div>
              <p style={{ margin: 0 }}>{item}</p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: '28px' }}>
          <TrackedLink className="primary" href={primaryHref} label={primaryLabel}>
            {primaryLabel}
          </TrackedLink>
        </div>
      </section>

      <section style={{ marginTop: '32px' }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">SaveGood</span>
            <h2>{secondTitle}</h2>
          </div>
        </div>
        <p style={{ fontSize: '17px', lineHeight: 1.65 }}>{secondText}</p>
      </section>

      <section style={{ marginTop: '36px' }} aria-labelledby="faq-heading">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-heading">Поширені запитання</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {faq.map((item) => (
            <details key={item.q} className="card" style={{ padding: '18px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 700 }}>{item.q}</summary>
              <p style={{ marginTop: '12px', marginBottom: 0, lineHeight: 1.6 }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <nav aria-label="Related SaveGood pages" style={{ marginTop: '34px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/">Головна</Link>
        {related.map(([href, label]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
    </main>
  );
}
