import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'AI Assistant у Telegram — AI-помічник для запитів | SaveGood',
  description: 'AI Assistant — Telegram-бот для текстових і голосових запитів. Відкрийте AI-помічника прямо в Telegram без окремої програми.',
  alternates: { canonical: 'https://savegood.store/ai-assistant-telegram-bot' },
  openGraph: {
    title: 'AI Assistant у Telegram | SaveGood',
    description: 'AI-помічник для текстових і голосових запитів прямо в Telegram.',
    url: 'https://savegood.store/ai-assistant-telegram-bot',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/assistant', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <SeoLanding
      breadcrumbLabel="AI Assistant"
      software={{
        name: 'AI Assistant',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Android, iOS, Windows, macOS, Web',
        sameAs: 'https://t.me/AIasistent_bot',
      }}
      description="AI Assistant — Telegram-бот для текстових і голосових запитів. Відкрийте AI-помічника прямо в Telegram без окремої програми."
      canonical="https://savegood.store/ai-assistant-telegram-bot"
      eyebrow="🤖 AI Assistant у Telegram"
      title="AI-помічник для текстових і голосових запитів"
      intro="AI Assistant працює прямо в Telegram і допомагає з повсякденними запитами без необхідності відкривати окремий веб-сервіс."
      bullets={[
        'Текстові запити прямо в Telegram',
        'Підтримка голосових запитів',
        'Швидкий доступ з телефона у звичайному чаті',
      ]}
      secondTitle="AI-помічник у звичному месенджері"
      secondText="Відкрийте бота, поставте запитання текстом або скористайтеся підтримуваним голосовим форматом. Уся взаємодія відбувається в Telegram."
      primaryHref="https://t.me/AIasistent_bot?start=savegood_assistant"
      primaryLabel="Відкрити AI Assistant"
      faq={[
        { q: 'Що вміє AI Assistant?', a: 'AI Assistant призначений для повсякденних текстових і голосових запитів у Telegram.' },
        { q: 'Чи потрібна реєстрація на окремому сайті?', a: 'Для відкриття самого бота достатньо перейти до нього в Telegram.' },
        { q: 'Де знайти AI Assistant?', a: 'Telegram-бот доступний за username @AIasistent_bot.' },
      ]}
      related={[
        ['/pryklady-ai-assistant', 'Приклади запитів'],
        ['/dzlegko-telegram-bot', 'ДЗЛегко'],
        ['/video-bot', 'AI Video Bot'],
        ['/ai-services', 'Усі AI-сервіси'],
      ]}
    />
  );
}
