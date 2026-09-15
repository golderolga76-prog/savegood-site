import Link from 'next/link';

export const metadata = {
  title: 'Контакти та підтримка | SaveGood',
  description: 'Контакти SaveGood та швидкі переходи до підтримки наших онлайн-сервісів.',
  alternates: { canonical: 'https://savegood.store/contact' },
};

export default function ContactPage() {
  return (
    <main className="legal-page">
      <nav className="legal-breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Головна</Link><span>›</span><span>Контакти</span>
      </nav>

      <span className="eyebrow">Підтримка</span>
      <h1>Контакти SaveGood</h1>
      <p className="legal-lead">
        Якщо у вас є питання щодо SaveGood, наших сторінок або сервісів, напишіть нам електронною поштою.
      </p>

      <section className="contact-card">
        <div className="contact-card__icon">✉️</div>
        <div>
          <h2>Email</h2>
          <a href="mailto:golderolga76@gmail.com">golderolga76@gmail.com</a>
          <p>Для технічних питань бажано додати посилання на сторінку та скріншот помилки.</p>
        </div>
      </section>

      <section>
        <h2>Наші сервіси</h2>
        <div className="contact-grid">
          <Link className="contact-link" href="/dzlegko-telegram-bot">
            <strong>📚 ДЗЛегко</strong>
            <span>@DZDopomogaBot</span>
          </Link>
          <Link className="contact-link" href="/ai-assistant-telegram-bot">
            <strong>🤖 AI Assistant</strong>
            <span>@AIasistent_bot</span>
          </Link>
          <Link className="contact-link" href="/video-bot">
            <strong>🎬 AI Video Bot</strong>
            <span>@VeoStudioAI_bot</span>
          </Link>
          <a className="contact-link" href="https://getveostudio.app/contact?utm_source=savegood.store&utm_medium=referral&utm_campaign=contact" target="_blank" rel="noopener noreferrer">
            <strong>🎥 Veo Studio</strong>
            <span>Веб-підтримка</span>
          </a>
        </div>
      </section>

      <section>
        <h2>Питання про сторонню покупку або бронювання</h2>
        <p>
          Якщо питання стосується оплати, бронювання, повернення чи замовлення на сторонньому сайті,
          звертайтеся безпосередньо до підтримки того сервісу, де була здійснена операція.
        </p>
      </section>

      <div className="legal-links">
        <Link href="/privacy">Конфіденційність</Link>
        <Link href="/terms">Умови</Link>
        <Link href="/pro-savegood">Про SaveGood</Link>
      </div>
    </main>
  );
}
