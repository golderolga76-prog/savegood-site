'use client';

import { useState } from 'react';

const tabs = [
  ['flights', '✈️', 'Авиабилеты'],
  ['hotels', '🏨', 'Отели'],
  ['deals', '🏷️', 'Скидки'],
  ['tours', '🎟️', 'Экскурсии'], 
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
        {tab === 'tours' && <Tours />}
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
     <a
  className="primary"
  href="https://aviasales.tp.st/NmyfLV1M"
  target="_blank"
  rel="noopener noreferrer"
>
  Найти билеты
</a>
    </form>
    <div style={{ marginTop: '16px' }}>
  <h3>Проблемы с рейсом?</h3>
  <p>Рейс задержали или отменили? Проверьте, положена ли вам компенсация.</p>

  <a
    className="primary"
    href="https://airhelp.tp.st/LJXTSL99"
    target="_blank"
    rel="noopener noreferrer"
  >
    Проверить компенсацию
  </a>
</div>
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

function Tours() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Экскурсии и билеты</span>
          <h2>Билеты в музеи и достопримечательности</h2>
          <p>Найдите интересные места, экскурсии и развлечения через Tiqets.</p>
        </div>
      </div>

      <a
        className="primary"
        href="https://tiqets.tp.st/ytO42Sgg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Найти билеты и экскурсии
      </a>
          <div style={{ marginTop: '16px' }}>
  <h3>eSIM для путешествий</h3>
  <p>Подключайте мобильный интернет за границей через Airalo.</p>

  <a
    className="primary"
    href="https://airalo.tp.st/9oPK1p4k"
    target="_blank"
    rel="noopener noreferrer"
  >
    Купить eSIM
  </a>
</div>
    </div>
  );
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
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleWeatherSubmit(e) {
    e.preventDefault();

    if (!city.trim()) {
      setError('Введите город');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city.trim())}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Не удалось получить погоду');
      }

      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Перед поездкой</span>
          <h2>Проверьте погоду</h2>
          <p>
            Узнайте текущую погоду и прогноз на ближайшие 3 дня.
          </p>
        </div>
        <div className="big-icon">🌤️</div>
      </div>

      <form className="weather-form" onSubmit={handleWeatherSubmit}>
        <label className="field">
          <span>Город</span>
          <input
            type="text"
            placeholder="Например, Athens"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Показать погоду'}
        </button>
      </form>

      {error && (
        <div className="weather-error">
          {error}
        </div>
      )}

      {weather && (
        <div className="weather-result">
          <div className="weather-current">
            <div>
              <span className="eyebrow">Сейчас</span>
              <h3>
                {weather.location.name}, {weather.location.country}
              </h3>

              <div className="weather-temp">
                {Math.round(weather.current.temp_c)}°C
              </div>

              <p>{weather.current.condition}</p>

              <div className="weather-details">
                <span>
                  Ощущается: {Math.round(weather.current.feelslike_c)}°C
                </span>
                <span>
                  Влажность: {weather.current.humidity}%
                </span>
                <span>
                  Ветер: {weather.current.wind_kph} км/ч
                </span>
              </div>
            </div>

            <img
              src={`https:${weather.current.icon}`}
              alt={weather.current.condition}
              className="weather-icon"
            />
          </div>

          <div className="weather-forecast">
            {weather.forecast.map((day) => (
              <div className="forecast-card" key={day.date}>
                <strong>{day.date}</strong>

                <img
                  src={`https:${day.icon}`}
                  alt={day.condition}
                />

                <span>{day.condition}</span>

                <b>
                  {Math.round(day.max_temp_c)}° /
                  {Math.round(day.min_temp_c)}°
                </b>

                <small>
                  Дождь: {day.chance_of_rain}%
                </small>
              </div>
            ))}
          </div>

          <div className="weather-source">
            Weather data by WeatherAPI.com
          </div>
        </div>
      )}
    </div>
  );
}
function Products() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Ваши сервисы</span><h2>Мои продукты</h2><p>Здесь разместим красивые карточки со ссылками на ваши действующие проекты.</p></div><div className="big-icon">🔗</div></div>
    <div className="cards">
      <article className="card"><div className="card-icon">🎬</div><h3>VeoStudio AI Video</h3><p>Создание AI-видео.</p><button disabled>Добавим ссылку</button></article>
      <article className="card"><div className="card-icon">🤖</div><h3>AI Assistant</h3><p>Удобный AI-помощник.</p><button disabled>Добавим ссылку</button></article>
      <article className="card">
  <div className="card-icon">🎬</div>
  <h3>VeoStudio</h3>
  <p>Создавайте AI-видео онлайн.</p>
  <a href="https://getveostudio.app" target="_blank" rel="noopener noreferrer">
    Открыть сайт
  </a>
</article>
    </div>
  </div>;
}
