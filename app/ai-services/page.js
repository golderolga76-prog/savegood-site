import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'AI-сервіси та Telegram-боти — Veo Studio, AI Assistant | SaveGood',
  description: 'AI-сервіси SaveGood: генерація AI-відео у Veo Studio та Telegram-боті, а також AI Assistant для текстових і голосових запитів.',
  alternates: { canonical: 'https://savegood.store/ai-services' },
};

export default function Page() {
  return (
    <SeoLanding
      eyebrow="🤖 AI-сервіси"
      title="AI-сервіси та Telegram-боти SaveGood"
      intro="На SaveGood зібрані наші AI-інструменти: Veo Studio для створення AI-відео, Telegram-бот для генерації відео та AI Assistant для повсякденних текстових і голосових запитів."
      bullets={[
        'Veo Studio — веб-сервіс для створення AI-відео',
        'AI Video Bot — генерація коротких AI-відео через Telegram',
        'AI Assistant — помічник для текстових і голосових запитів',
      ]}
      secondTitle="Веб-сервіси та боти в одному каталозі"
      secondText="Ця сторінка допомагає швидко зрозуміти, які AI-інструменти доступні у SaveGood, і перейти до потрібного сервісу. Можливості та умови кожного продукту вказані на його власній сторінці."
      primaryHref="/video-bot"
      primaryLabel="Відкрити AI Video Bot"
      related={[
        ['/find-cheaper-products', 'Знайти товар дешевше'],
        ['/ukrainians-in-europe', 'Українцям у Європі'],
        ['/cheap-flights-europe', 'Подорожі'],
      ]}
    />
  );
}
