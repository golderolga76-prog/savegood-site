import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'Готелі в Європі — пошук житла онлайн | SaveGood',
  description: 'Знайдіть готель для подорожі по Європі через SaveGood. Перейдіть до партнерського сервісу, щоб перевірити актуальні ціни та доступність.',
  alternates: { canonical: 'https://savegood.store/hotels-in-europe' },
};

export default function Page() {
  return (
    <SeoLanding
      eyebrow="🏨 Готелі"
      title="Пошук готелів у Європі"
      intro="SaveGood допомагає швидко перейти до пошуку готелів для поїздок по Європі. Актуальні ціни, доступність номерів, бронювання та оплата показуються на сайті партнерського сервісу."
      bullets={[
        'Пошук житла для поїздок і відпочинку',
        'Перехід до актуальної доступності та цін партнера',
        'Зручно поєднувати з пошуком авіаквитків через SaveGood',
      ]}
      secondTitle="Все для поїздки з однієї стартової сторінки"
      secondText="На SaveGood можна перейти від пошуку перельоту до пошуку готелю, а також знайти інші корисні сервіси для подорожі. Саме бронювання виконується на зовнішньому партнерському сайті."
      primaryHref="/hotels"
      primaryLabel="Знайти готель"
      related={[
        ['/cheap-flights-europe', 'Авіаквитки'],
        ['/ukrainians-in-europe', 'Українцям у Європі'],
        ['/ai-services', 'AI-сервіси'],
      ]}
    />
  );
}
