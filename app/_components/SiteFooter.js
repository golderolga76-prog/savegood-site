import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>SaveGood</strong>
          <span>Корисні сервіси для українців у Європі</span>
        </div>

        <nav className="site-footer__links" aria-label="Нижня навігація">
          <Link href="/pro-savegood">Про SaveGood</Link>
          <Link href="/nashi-servisy">Наші сервіси</Link>
          <Link href="/privacy">Конфіденційність</Link>
          <Link href="/terms">Умови</Link>
          <Link href="/contact">Контакти</Link>
        </nav>

        <p className="site-footer__note">
          Деякі зовнішні посилання можуть бути партнерськими. SaveGood може отримати винагороду,
          якщо користувач скористається такою пропозицією. Умови покупки, бронювання або оплати
          визначає відповідний сторонній сервіс.
        </p>

        <p className="site-footer__copy">© {new Date().getFullYear()} SaveGood.store</p>
      </div>
    </footer>
  );
}
