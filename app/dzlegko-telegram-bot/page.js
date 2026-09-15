import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'ДЗЛегко — Telegram-бот для допомоги з домашнім завданням | SaveGood',
  description: 'ДЗЛегко — Telegram-бот для батьків школярів 5–9 класів в Україні. Надішліть фото домашнього завдання та отримайте відповідь і пояснення.',
  alternates: { canonical: 'https://savegood.store/dzlegko-telegram-bot' },
  openGraph: {
    title: 'ДЗЛегко — Telegram-бот для домашнього завдання',
    description: 'Допомога батькам школярів 5–9 класів: фото завдання, відповідь і пояснення у Telegram.',
    url: 'https://savegood.store/dzlegko-telegram-bot',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/dzlegko', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <SeoLanding
      breadcrumbLabel="ДЗЛегко"
      software={{
        name: 'ДЗЛегко',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Android, iOS, Windows, macOS, Web',
        sameAs: 'https://t.me/DZDopomogaBot',
      }}
      description="ДЗЛегко — Telegram-бот для батьків школярів 5–9 класів в Україні. Надішліть фото домашнього завдання та отримайте відповідь і пояснення."
      canonical="https://savegood.store/dzlegko-telegram-bot"
      eyebrow="📚 Telegram-бот для батьків"
      title="ДЗЛегко — допомога з домашнім завданням у Telegram"
      intro="ДЗЛегко допомагає батькам школярів 5–9 класів швидше перевірити або пояснити домашнє завдання. Достатньо надіслати фото сторінки із завданням у Telegram-бот."
      bullets={[
        'Надішліть фото завдання прямо в Telegram',
        'Отримайте відповідь і коротке пояснення',
        'Створено з акцентом на допомогу батькам школярів 5–9 класів',
      ]}
      secondTitle="Фото завдання — відповідь у тому самому чаті"
      secondText="Не потрібно вибирати складні режими або переходити між сервісами. Відкрийте бота, надішліть чітке фото домашнього завдання та отримайте результат у Telegram."
      primaryHref="https://t.me/DZDopomogaBot?start=savegood_dz"
      primaryLabel="Відкрити ДЗЛегко в Telegram"
      faq={[
        { q: 'Для кого створений бот ДЗЛегко?', a: 'Бот орієнтований насамперед на батьків школярів 5–9 класів, яким потрібно швидко перевірити або зрозуміти домашнє завдання.' },
        { q: 'Як користуватися ДЗЛегко?', a: 'Відкрийте Telegram-бот, надішліть чітке фото завдання та дочекайтеся відповіді й пояснення.' },
        { q: 'Чи потрібно встановлювати окрему програму?', a: 'Ні. Достатньо Telegram і доступу до бота @DZDopomogaBot.' },
      ]}
      related={[
        ['/perevirka-domashnoho-zavdannia-po-foto', 'Перевірка завдання по фото'],
        ['/dopomoga-z-matematykoiu-5-9-klas', 'Математика 5–9 клас'],
        ['/pryklady-zavdan-po-foto', 'Приклади завдань по фото'],
        ['/dopomoga-z-domashnim-zavdanniam', 'Допомога з домашнім завданням 5–9 клас'],
        ['/ai-assistant-telegram-bot', 'AI Assistant'],
        ['/video-bot', 'AI Video Bot'],
        ['/ai-services', 'Усі AI-сервіси'],
      ]}
    />
  );
}
