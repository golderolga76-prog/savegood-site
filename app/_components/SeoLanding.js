import Link from 'next/link';

export default function SeoLanding({
  eyebrow,
  title,
  intro,
  bullets,
  secondTitle,
  secondText,
  primaryHref,
  primaryLabel,
  related = [],
}) {
  return (
    <main style={{ maxWidth: '960px', margin: '0 auto', padding: '48px 20px', fontFamily: 'Arial, sans-serif' }}>
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
          <Link className="primary" href={primaryHref}>{primaryLabel}</Link>
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

      <nav aria-label="Related SaveGood pages" style={{ marginTop: '34px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
        <Link href="/">Головна</Link>
        {related.map(([href, label]) => (
          <Link key={href} href={href}>{label}</Link>
        ))}
      </nav>
    </main>
  );
}
