import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1>Сторінку не знайдено</h1>
        <p>
          Можливо, адреса змінилася або в посиланні є помилка. Перейдіть на головну або відкрийте каталог наших сервісів.
        </p>
        <div className="not-found-actions">
          <Link className="primary" href="/">На головну</Link>
          <Link className="secondary-link" href="/nashi-servisy">Наші сервіси</Link>
        </div>
      </div>
    </main>
  );
}
