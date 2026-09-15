import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'Допомога з українською мовою 5–9 клас — ДЗЛегко | SaveGood',
  description: 'Допомога з українською мовою для 5–9 класів: сфотографуйте вправу з підручника або зошита та надішліть її в Telegram-бот ДЗЛегко.',
  alternates: { canonical: 'https://savegood.store/dopomoga-z-ukrainskoiu-movoiu-5-9-klas' },
  openGraph: {
    title: 'Допомога з українською мовою 5–9 клас — ДЗЛегко',
    description: 'Вправи з правопису, граматики та синтаксису можна надіслати фото в Telegram.',
    url: 'https://savegood.store/dopomoga-z-ukrainskoiu-movoiu-5-9-klas',
    siteName: 'SaveGood',
    type: 'website',
    images: [{ url: 'https://savegood.store/api/og/dzlegko', width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <SeoLanding
      breadcrumbLabel="Українська мова 5–9 клас"
      description="Допомога з українською мовою для 5–9 класів: сфотографуйте вправу з підручника або зошита та надішліть її в Telegram-бот ДЗЛегко."
      canonical="https://savegood.store/dopomoga-z-ukrainskoiu-movoiu-5-9-klas"
      eyebrow="✍️ Українська мова 5–9 клас"
      title="Допомога з українською мовою для 5–9 класів"
      intro="ДЗЛегко допомагає батькам швидше розібратися зі шкільними вправами з української мови. Можна сфотографувати завдання з підручника або зошита й отримати відповідь та пояснення."
      bullets={[
        'Правопис і орфографічні вправи',
        'Граматика, частини мови та будова слова',
        'Синтаксис, речення, розділові знаки та аналіз тексту',
      ]}
      secondTitle="Що важливо показати на фото"
      secondText="Залиште в кадрі повну умову, номер вправи та весь текст, з яким потрібно працювати. Якщо завдання просить пояснити правило або знайти помилки, сфотографуйте також приклади з підручника, якщо вони є."
      primaryHref="https://t.me/DZDopomogaBot?start=savegood_ukrainian"
      primaryLabel="Відкрити ДЗЛегко"
      faq={[
        { q: 'Чи можна надіслати вправу з підручника?', a: 'Так. Сфотографуйте всю умову та текст вправи так, щоб вони були чітко видимі.' },
        { q: 'Чи допоможе бот з правописом?', a: 'Бот може допомогти розібрати типові вправи з правопису, граматики та інших тем шкільної програми.' },
        { q: 'Чи варто просто переписувати готову відповідь?', a: 'Краще використати пояснення, щоб зрозуміти правило та перевірити власне виконання завдання.' },
      ]}
      related={[
        ['/dzlegko-telegram-bot', 'ДЗЛегко'],
        ['/pryklady-zavdan-po-foto', 'Приклади завдань по фото'],
        ['/dopomoga-z-matematykoiu-5-9-klas', 'Математика 5–9 клас'],
        ['/perevirka-domashnoho-zavdannia-po-foto', 'Перевірка ДЗ по фото'],
      ]}
    />
  );
}
