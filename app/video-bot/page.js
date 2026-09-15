import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'AI Video Bot у Telegram — генерація AI-відео | SaveGood',
  description: 'AI Video Bot у Telegram: надішліть текстовий промпт і створюйте короткі AI-відео прямо в чаті через @VeoStudioAI_bot.',
  alternates: { canonical: 'https://savegood.store/video-bot' },
};

export default function VideoBotPage() {
  return (
    <SeoLanding
      description="AI Video Bot у Telegram: надішліть текстовий промпт і створюйте короткі AI-відео прямо в чаті через @VeoStudioAI_bot."
      canonical="https://savegood.store/video-bot"
      eyebrow="🎬 AI Video Bot у Telegram"
      title="Створюйте AI-відео прямо в Telegram"
      intro="Опишіть потрібне відео текстовим промптом у Telegram-боті. AI Video Bot запускає генерацію та повертає готовий результат у чат."
      bullets={[
        'Запуск генерації безпосередньо з Telegram',
        'Текстовий промпт замість складного редактора',
        'Готове AI-відео повертається в чат бота',
      ]}
      secondTitle="Простий спосіб спробувати AI-відео"
      secondText="AI Video Bot підійде, якщо ви хочете запускати короткі генерації з телефона без окремого складного інтерфейсу. Для ширшого веб-інтерфейсу доступний Veo Studio."
      primaryHref="https://t.me/VeoStudioAI_bot"
      primaryLabel="Відкрити AI Video Bot"
      faq={[
        { q: 'Як створити відео через AI Video Bot?', a: 'Відкрийте @VeoStudioAI_bot у Telegram, надішліть текстовий опис потрібного відео та запустіть доступну генерацію.' },
        { q: 'Чи потрібна окрема програма?', a: 'Ні. Для роботи з ботом достатньо Telegram.' },
        { q: 'Чим бот відрізняється від Veo Studio?', a: 'Бот дає простий Telegram-формат, а Veo Studio — окремий веб-сервіс із ширшим інтерфейсом для AI-відео.' },
      ]}
      related={[
        ['/dzlegko-telegram-bot', 'ДЗЛегко'],
        ['/ai-assistant-telegram-bot', 'AI Assistant'],
        ['/ai-services', 'Усі AI-сервіси'],
      ]}
    />
  );
}
