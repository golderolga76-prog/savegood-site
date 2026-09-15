import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'Приклади промптів для AI Video Bot у Telegram | SaveGood',
  description: 'Готові приклади промптів для AI Video Bot: товарне відео, кінематографічна сцена, короткий ролик для соцмереж та проста анімація.',
  alternates: { canonical: 'https://savegood.store/pryklady-ai-video-bot' },
  openGraph: {
    title: 'Приклади промптів для AI Video Bot',
    description: 'Кілька простих ідей, які можна адаптувати та надіслати в Telegram-бот для створення AI-відео.',
    url: 'https://savegood.store/pryklady-ai-video-bot',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/videobot', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <SeoLanding
      breadcrumbLabel="Приклади для AI Video Bot"
      description="Готові приклади промптів для AI Video Bot: товарне відео, кінематографічна сцена, короткий ролик для соцмереж та проста анімація."
      canonical="https://savegood.store/pryklady-ai-video-bot"
      eyebrow="🎬 Приклади для AI Video Bot"
      title="Що можна написати AI Video Bot"
      intro="Не обов'язково починати зі складного сценарію. Для першого відео достатньо коротко описати об'єкт, дію, місце, камеру та бажаний стиль."
      bullets={[
        'Товарне відео: «Флакон парфумів повільно обертається на темній поверхні, м’яке студійне світло, рекламний стиль»',
        'Кінематографічна сцена: «Білий кінь біжить берегом моря на заході сонця, камера рухається поруч, реалістичний стиль»',
        'Short-form: «Яскравий напій на столику кафе, швидке наближення камери, сонячні відблиски, енергійна реклама»',
      ]}
      secondTitle="Як покращити промпт"
      secondText="Якщо результат майже підходить, не переписуйте все одразу. Змініть один параметр: рух об'єкта, камеру, освітлення або стиль. Так простіше зрозуміти, що саме впливає на результат."
      primaryHref="https://t.me/VeoStudioAI_bot?start=savegood_video_examples"
      primaryLabel="Спробувати промпт у AI Video Bot"
      faq={[
        { q: 'Промпт має бути довгим?', a: 'Ні. Краще короткий і чіткий опис, у якому зрозуміло, що відбувається в кадрі.' },
        { q: 'Чи можна писати промпт українською?', a: 'Можна почати з українського опису. Результат також залежить від конкретної відеомоделі та її підтримуваних можливостей.' },
        { q: 'Що робити, якщо перше відео не сподобалось?', a: 'Змініть одну важливу деталь у промпті та спробуйте ще раз, якщо у вас є доступна генерація.' },
      ]}
      related={[
        ['/video-bot', 'AI Video Bot'],
        ['/ai-assistant-telegram-bot', 'AI Assistant'],
        ['/nashi-servisy', 'Усі наші сервіси'],
      ]}
    />
  );
}
