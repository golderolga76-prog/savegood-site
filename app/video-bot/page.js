export const metadata = {
  title: 'AI Video Bot in Telegram — SaveGood',
  description:
    'Create AI videos directly in Telegram. Try the VeoStudio AI Video Bot and discover Veo Studio and AI Assistant.',
};

export default function VideoBotPage() {
  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <section className="panel">
        <span className="eyebrow">🎬 AI VIDEO BOT</span>

        <h1 style={{ marginTop: '10px' }}>
          Створюйте AI-відео прямо в Telegram
        </h1>

        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Надішліть текстовий промпт у Telegram-бот — і створюйте короткі
          AI-відео без складних програм та налаштувань.
        </p>

        <div style={{ marginTop: '24px' }}>
          <a
            className="primary"
            href="https://t.me/VeoStudioAI_bot"
            target="_blank"
            rel="noopener noreferrer"
          >
            Відкрити AI Video Bot
          </a>
        </div>
      </section>

      <section style={{ marginTop: '30px' }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Як це працює</span>
            <h2>Три прості кроки</h2>
          </div>
        </div>

        <div className="cards">
          <article className="card">
            <div className="card-icon">1️⃣</div>
            <h3>Відкрийте бота</h3>
            <p>Перейдіть у Telegram та запустіть AI Video Bot.</p>
          </article>

          <article className="card">
            <div className="card-icon">2️⃣</div>
            <h3>Напишіть промпт</h3>
            <p>Опишіть, яке відео хочете отримати.</p>
          </article>

          <article className="card">
            <div className="card-icon">3️⃣</div>
            <h3>Отримайте відео</h3>
            <p>Бот запустить генерацію та надішле готовий результат.</p>
          </article>
        </div>
      </section>

      <section style={{ marginTop: '30px' }}>
        <div className="section-heading">
          <div>
            <span className="eyebrow">Ще більше можливостей</span>
            <h2>Наші AI-сервіси</h2>
          </div>
        </div>

        <div className="cards">
          <article className="card">
            <div className="card-icon">🎥</div>
            <h3>Veo Studio</h3>
            <p>Повноцінний веб-сервіс для створення AI-відео.</p>
            <a
              href="https://getveostudio.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Відкрити Veo Studio
            </a>
          </article>

          <article className="card">
            <div className="card-icon">🤖</div>
            <h3>AI Assistant</h3>
            <p>AI-помічник у Telegram для текстових і голосових запитів.</p>
            <a
              href="https://t.me/AIasistent_bot"
              target="_blank"
              rel="noopener noreferrer"
            >
              Відкрити AI Assistant
            </a>
          </article>
        </div>
      </section>

      <p style={{ marginTop: '32px', fontSize: '14px', opacity: 0.75 }}>
        SaveGood допомагає знаходити корисні AI-сервіси та онлайн-інструменти.
      </p>
    </main>
  );
}
