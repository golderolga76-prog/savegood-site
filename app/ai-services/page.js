import SeoLanding from '../_components/SeoLanding';

export const metadata = {
  title: 'AI-сервіси та Telegram-боти — Veo Studio, AI Assistant | SaveGood',
  description: 'AI-сервіси SaveGood: генерація AI-відео у Veo Studio та Telegram-боті, а також AI Assistant для текстових і голосових запитів.',
  alternates: { canonical: 'https://savegood.store/ai-services' },
};

export default function Page() {
  return (
    <SeoLanding
      description="AI-сервіси SaveGood: генерація AI-відео у Veo Studio та Telegram-боті, а також AI Assistant для текстових і голосових запитів."
      canonical="https://savegood.store/ai-services"
      eyebrow="🤖 AI-сервіси"
      title="AI-сервіси та Telegram-боти SaveGood"
      intro="На SaveGood зібрані наші AI-інструменти: Veo Studio для створення AI-відео, AI Video Bot у Telegram, AI Assistant та ДЗЛегко для допомоги батькам зі шкільними завданнями."
      bullets={[
        'Veo Studio — веб-сервіс для створення AI-відео',
        'AI Video Bot — генерація коротких AI-відео через Telegram',
        'AI Assistant — помічник для текстових і голосових запитів',
        'ДЗЛегко — допомога батькам з домашніми завданнями школярів',
      ]}
      secondTitle="Веб-сервіси та боти в одному каталозі"
      secondText="Ця сторінка допомагає швидко зрозуміти, які AI-інструменти доступні у SaveGood, і перейти до потрібного сервісу. Можливості та умови кожного продукту вказані на його власній сторінці."
      primaryHref="/video-bot"
      primaryLabel="Відкрити AI Video Bot"
      faq={[
        { q: 'Які AI-сервіси доступні через SaveGood?', a: 'На сторінці зібрані Veo Studio для створення AI-відео, AI Video Bot у Telegram та AI Assistant для текстових і голосових запитів.' },
        { q: 'Чим Veo Studio відрізняється від AI Video Bot?', a: 'Veo Studio — це веб-сервіс із ширшим інтерфейсом для генерації відео, а AI Video Bot дає змогу запускати короткі генерації безпосередньо в Telegram.' },
        { q: 'Чи потрібен Telegram для всіх AI-сервісів?', a: 'Ні. Veo Studio працює як окремий веб-сервіс, тоді як AI Video Bot і AI Assistant доступні через Telegram.' },
      ]}
      related={[
        ['/dzlegko-telegram-bot', 'ДЗЛегко'],
        ['/ai-assistant-telegram-bot', 'AI Assistant'],
        ['/video-bot', 'AI Video Bot'],
        ['/find-cheaper-products', 'Знайти товар дешевше'],
      ]}
    />
  );
}
