'use client';

import { useState } from 'react';

const tabs = [
  ['flights', '✈️', 'Авиабилеты'],
  ['hotels', '🏨', 'Отели'],
  ['deals', '🏷️', 'Скидки'],
  ['weather', '🌤️', 'Погода'],
  ['products', '🔗', 'Мои продукты']
];

export default function Home() {
  const [tab, setTab] = useState('flights');

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div>
            <h1 className="brand">SaveGood</h1>
            <p className="tagline">Find • Compare • Save</p>
          </div>
        </div>
        <p className="intro">Всё полезное для поездок, выгодных покупок и ваших любимых сервисов — в одном месте.</p>
      </header>

      <nav className="tabs" aria-label="Основные разделы">
        {tabs.map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} className={tab === id ? 'tab active' : 'tab'}>
            <span>{icon}</span>{label}
          </button>
        ))}
      </nav>

      <section className="panel">
        {tab === 'flights' && <FlightSearch />}
        {tab === 'hotels' && <HotelSearch />}
        {tab === 'deals' && <Deals />}
        {tab === 'weather' && <Weather />}
        {tab === 'products' && <Products />}
      </section>

      <section className="notice">
        <strong>SaveGood помогает найти предложения.</strong>
        <span> Бронирование, покупка и оплата выполняются на сайтах соответствующих партнёров.</span>
      </section>

      <footer className="footer">© 2026 SaveGood.store</footer>
    </main>
  );
}

function Field({ label, type='text', placeholder }) {
  return <label className="field"><span>{label}</span><input type={type} placeholder={placeholder} /></label>;
}

function FlightSearch() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Путешествия</span><h2>Найдите авиабилеты</h2><p>Введите направление и даты. После подключения партнёров поиск будет вести к актуальным предложениям.</p></div><div className="big-icon">✈️</div></div>
    <form className="search-grid" onSubmit={e => e.preventDefault()}>
      <Field label="Откуда" placeholder="Например, Athens" />
      <Field label="Куда" placeholder="Например, Rome" />
      <Field label="Дата вылета" type="date" />
      <Field label="Дата возвращения" type="date" />
      <label className="field"><span>Пассажиры</span><select defaultValue="1"><option value="1">1 пассажир</option><option value="2">2 пассажира</option><option value="3">3 пассажира</option><option value="4">4 пассажира</option></select></label>
      <button className="primary" type="submit">Найти билеты</button>
    </form>
  </div>;
}

function HotelSearch() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Проживание</span><h2>Найдите отель</h2><p>Выберите город, даты проживания и количество гостей.</p></div><div className="big-icon">🏨</div></div>
    <form className="search-grid" onSubmit={e => e.preventDefault()}>
      <Field label="Город или направление" placeholder="Например, Thessaloniki" />
      <Field label="Заезд" type="date" />
      <Field label="Выезд" type="date" />
      <label className="field"><span>Гости</span><select defaultValue="2"><option value="1">1 гость</option><option value="2">2 гостя</option><option value="3">3 гостя</option><option value="4">4 гостя</option></select></label>
      <button className="primary wide" type="submit">Найти отели</button>
    </form>
  </div>;
}

function Deals() {
  const cards = [
    ['Электроника', 'Техника, гаджеты и аксессуары', '💻'],
    ['Красота', 'Уход, косметика и популярные предложения', '✨'],
    ['Дом', 'Полезные товары для дома и быта', '🏠'],
    ['Мода', 'Одежда, обувь и аксессуары', '🛍️']
  ];
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Выгодные покупки</span><h2>Скидки и предложения</h2><p>Позже сюда подключим реальные партнёрские предложения магазинов.</p></div><div className="big-icon">🏷️</div></div>
    <div className="cards">{cards.map(c => <article className="card" key={c[0]}><div className="card-icon">{c[2]}</div><h3>{c[0]}</h3><p>{c[1]}</p><button disabled>Скоро</button></article>)}</div>
  </div>;
}

function Weather() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Перед поездкой</span><h2>Проверьте погоду</h2><p>В первой версии подготовим интерфейс, затем подключим погодный API.</p></div><div className="big-icon">🌤️</div></div>
    <form className="weather-form" onSubmit={e => e.preventDefault()}><Field label="Город" placeholder="Например, Athens" /><button className="primary" type="submit">Показать погоду</button></form>
  </div>;
}

function Products() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Ваши сервисы</span><h2>Мои продукты</h2><p>Здесь разместим красивые карточки со ссылками на ваши действующие проекты.</p></div><div className="big-icon">🔗</div></div>
    <div className="cards">
      <article className="card"><div className="card-icon">🎬</div><h3>VeoStudio AI Video</h3><p>Создание AI-видео.</p><button disabled>Добавим ссылку</button></article>
      <article className="card"><div className="card-icon">🤖</div><h3>AI Assistant</h3><p>Удобный AI-помощник.</p><button disabled>Добавим ссылку</button></article>
      <article className="card"><div className="card-icon">🔮</div><h3>Tarot & 36 Cards</h3><p>Онлайн-сервис и Telegram-проект.</p><button disabled>Добавим ссылку</button></article>
    </div>
  </div>;
}
