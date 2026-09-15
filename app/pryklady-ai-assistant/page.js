import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'Приклади запитів для AI Assistant у Telegram | SaveGood',
  description: 'Приклади повсякденних запитів для AI Assistant: пояснення, тексти, ідеї, планування, переклад та допомога з формулюванням.',
  alternates: { canonical: 'https://savegood.store/pryklady-ai-assistant' },
  openGraph: {
    title: 'Приклади запитів для AI Assistant',
    description: 'Ідеї запитів, з яких можна почати роботу з AI-помічником у Telegram.',
    url: 'https://savegood.store/pryklady-ai-assistant',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/assistant', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <SeoLanding
      breadcrumbLabel="Приклади для AI Assistant"
      description="Приклади повсякденних запитів для AI Assistant: пояснення, тексти, ідеї, планування, переклад та допомога з формулюванням."
      canonical="https://savegood.store/pryklady-ai-assistant"
      eyebrow="🤖 Приклади для AI Assistant"
      title="Що можна запитати в AI Assistant"
      intro="AI Assistant зручний для коротких повсякденних задач у Telegram. Сформулюйте, що потрібно отримати, додайте важливі умови — і використовуйте відповідь як робочий чернетковий результат."
      bullets={[
        '«Поясни простими словами, що означає цей текст»',
        '«Допоможи написати коротке ввічливе повідомлення українською»',
        '«Запропонуй 5 ідей для допису про мій сервіс»',
        '«Переклади цей текст українською та збережи природний стиль»',
      ]}
      secondTitle="Як отримати кориснішу відповідь"
      secondText="Додайте контекст: для кого текст, яка потрібна мова, довжина, стиль і що обов'язково треба врахувати. Для важливих фактів, документів, фінансових або медичних рішень перевіряйте інформацію у відповідних надійних джерелах."
      primaryHref="https://t.me/AIasistent_bot?start=savegood_assistant_examples"
      primaryLabel="Відкрити AI Assistant"
      faq={[
        { q: 'Чи можна ставити короткі запитання?', a: 'Так. Але додатковий контекст часто допомагає отримати точнішу і кориснішу відповідь.' },
        { q: 'Чи можна просити допомогу з текстами?', a: 'Так. Наприклад, можна попросити скоротити, переписати, перекласти або запропонувати варіанти формулювання.' },
        { q: 'Чи завжди відповідь AI правильна?', a: 'Ні. AI може помилятися, тому важливу фактичну інформацію потрібно перевіряти.' },
      ]}
      related={[
        ['/ai-assistant-telegram-bot', 'AI Assistant'],
        ['/video-bot', 'AI Video Bot'],
        ['/nashi-servisy', 'Усі наші сервіси'],
      ]}
    />
  );
}
