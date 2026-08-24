'use client';

import { useState } from 'react';

const tabs = [
  ['flights', '✈️', 'Авіаквитки'],
  ['hotels', '🏨', 'Готелі'],
  ['tours', '🧳', 'Подорожі'],
  ['ukraine', '🇺🇦', 'Українцям у Європі'],
  ['news', '📰', 'Новини'],
  ['weather', '🌤️', 'Погода'],
];
export default function Home() {
  const [tab, setTab] = useState('flights');

  return (
    <main className="page-shell">
      <header className="hero">
        <div className="brand-wrap">
          <div className="brand-mark">S</div>
          <div className="brand-mark">🇺🇦🇪🇺</div>
<div>
  <h1 className="brand">SaveGood</h1>
  <p className="tagline">Корисне для українців у Європі</p>
</div>
    </div>


<p className="intro">
  Подорожі, важливі новини, документи та корисні сервіси в одному місці.
</p>
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
       {tab === 'tours' && <Tours />}
       {tab === 'ukraine' && <UkraineEurope />}
       {tab === 'news' && <News />}
       {tab === 'weather' && <Weather />}
          </section>

      <section className="notice">
        <strong>SaveGood допомогає знайти пропозиції.</strong>
        <span> Бронювання, купівля та оплата здійснюється на сайтах відповідних партнерів.</span>
      </section>
        <section style={{ marginTop: '24px' }}>
  <div className="section-heading">
    <div>
      <span className="eyebrow">Наші сервіси</span>
      <h2>Корисні онлайн-сервіси</h2>
    </div>
  </div>

  <Products />
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
    <div className="section-heading"><div><span className="eyebrow">Подорожі</span><h2>Знайдіть авіаквитки</h2><p>Введіть напрямок та дату. Пфсля підключення партнерів пошук буде вести до актуальних пропозицій.</p></div><div className="big-icon">✈️</div></div>
    <form className="search-grid" onSubmit={e => e.preventDefault()}>
      <Field label="Звідки" placeholder="Наприклад, Салоніки" />
      <Field label="Куди" placeholder="Наприклад, Афіни" />
      <Field label="Дата виліту" type="date" />
      <Field label="Дата повернення" type="date" />
      <label className="field"><span>Пасажира</span><select defaultValue="1"><option value="1">1 пасажир</option><option value="2">2 пасажира</option><option value="3">3 пасажира</option><option value="4">4 пасажира</option></select></label>
     <a
  className="primary"
  href="https://aviasales.tp.st/NmyfLV1M"
  target="_blank"
  rel="noopener noreferrer"
>
   Знайти квитки
    </a>
    </form>
    <div style={{ marginTop: '16px' }}>
  <h3>Проблема с рейсом?</h3>
  <p>Рейс затримали або відмінили.</p>

  <a
    className="primary"
    href="https://airhelp.tp.st/LJXTSL99"
    target="_blank"
    rel="noopener noreferrer"
  >
    Перевірити компенсацію
  </a>
</div>
  </div>;
}

function HotelSearch() {
  return <div>
    <div className="section-heading"><div><span className="eyebrow">Проживання</span><h2>Знайти готель</h2><p>Обрати місто, дату проживання та кількість гостей.</p></div><div className="big-icon">🏨</div></div>
    <form className="search-grid" onSubmit={e => e.preventDefault()}>
      <Field label="Місто та напрямок" placeholder="Наприклад, Thessaloniki" />
      <Field label="Заїзд" type="date" />
      <Field label="Виїзд" type="date" />
      <label className="field"><span>Гості</span><select defaultValue="2"><option value="1">1 гость</option><option value="2">2 гостя</option><option value="3">3 гостя</option><option value="4">4 гостя</option></select></label>
      <a
  className="primary wide"
  href="https://www.trip.com/hotels?Allianceid=10267076&SID=329339305&trip_sub1=&trip_sub3=D19467457"
  target="_blank"
  rel="noopener noreferrer"
>
  Знайти готель
</a>
    </form>
  </div>;
}

function Tours() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">Экскурсії та квитки</span>
          <h2>Квитки до музеїв та визначних місць</h2>
          <p>Знайдіть цікаві місця, екскурсії та розваги через Tiqets.</p>
        </div>
      </div>

      <a
        className="primary"
        href="https://tiqets.tp.st/ytO42Sgg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Знайти квитки та екскурсії
      </a>
          <div style={{ marginTop: '16px' }}>
  <h3>eSIM для подорожей</h3>
  <p>Підключайте мобільний інтернет за кордоном через Airalo.</p>

  <a
    className="primary"
    href="https://airalo.tp.st/9oPK1p4k"
    target="_blank"
    rel="noopener noreferrer"
  >
    Купити eSIM
  </a>
</div>
      <div style={{ marginTop: '16px' }}>
  <h3>оренда авто</h3>
  <p>Знайти авто для подорожі через GetRentacar.</p>

  <a
    className="primary"
    href="https://getrentacar.tp.st/gLdfKqfp"
    target="_blank"
    rel="noopener noreferrer"
  >
    Знайти авто
  </a>
</div>
      <div style={{ marginTop: '16px' }}>
  <h3>Трансфер з аеропорту</h3>
  <p>Замов зручний трансфер через Kiwitaxi.</p>

  <a
    className="primary"
    href="https://kiwitaxi.tp.st/RV7ba6y2"
    target="_blank"
    rel="noopener noreferrer"
  >
    Замовити трансфер
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
      setError('Введіть місто');
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
        throw new Error(data.error || 'Не вдалося отримати погоду');
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
          <span className="eyebrow">Перед поїздкою</span>
          <h2>Перевірте погоду</h2>
          <p>
            Дізнайтеся поточну погоду та прогноз на найближчі 3 дні.
          </p>
        </div>
        <div className="big-icon">🌤️</div>
      </div>

      <form className="weather-form" onSubmit={handleWeatherSubmit}>
        <label className="field">
          <span>Город</span>
          <input
            type="text"
            placeholder="Наприклад, Athens"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>

        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Завантаження...' : 'Показати погоду'}
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
              <span className="eyebrow">Зараз</span>
              <h3>
                {weather.location.name}, {weather.location.country}
              </h3>

              <div className="weather-temp">
                {Math.round(weather.current.temp_c)}°C
              </div>

              <p>{weather.current.condition}</p>

              <div className="weather-details">
                <span>
                  Відчувається: {Math.round(weather.current.feelslike_c)}°C
                </span>
                <span>
                  Вологість: {weather.current.humidity}%
                </span>
                <span>
                  Вітер: {weather.current.wind_kph} км/г
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
    <div className="section-heading"><div><span className="eyebrow">Сервіси</span><h2>Мої продукти</h2><p>Тут знаходяться сервіси з посиланням.</p></div><div className="big-icon">🔗</div></div>
    <div className="cards">
      <article className="card"><div className="card-icon">🎬</div><h3>VeoStudio AI Video</h3><p> AI-відео.</p><button disabled><a
  href="https://t.me/VeoStudioAI_bot"
  target="_blank"
  rel="noopener noreferrer"
>
  Відкрити бота
</a></button></article>
      <article className="card"><div className="card-icon">🤖</div><h3>AI Assistant</h3><p> AI-помічник.</p><button disabled><a
  href="https://t.me/AIasistent_bot"
  target="_blank"
  rel="noopener noreferrer"
>
  Відкрити AI Assistant
</a></button></article>
      <article className="card">
  <div className="card-icon">🎬</div>
  <h3>VeoStudio</h3>
  <p>Зробити AI-відео онлайн.</p>
  <a href="https://getveostudio.app" target="_blank" rel="noopener noreferrer">
    Відкрити сайт
  </a>
</article>
    </div>
  </div>;
}
function UkraineEurope() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">🇺🇦 Українцям у Європі</span>
          <h2>Корисна інформація для українців</h2>
          <p>
            Тимчасовий захист, документи, робота, виплати, медицина
            та важливі зміни в країнах Європи.
          </p>
        </div>
      </div>

      <div className="cards">
        <article className="card">
          <div className="card-icon">🪪</div>
          <h3>Документи і захист</h3>
          <p>Правила тимчасового захисту, посвідки та важливі документи.</p>
        </article>

        <article className="card">
          <div className="card-icon">💼</div>
          <h3>Робота і допомога</h3>
          <p>Корисна інформація про роботу, виплати та соціальну підтримку.</p>
        </article>

        <article className="card">
          <div className="card-icon">🏥</div>
          <h3>Медицина і побут</h3>
          <p>Медична допомога, страхування та повсякденні сервіси.</p>
        </article>
      </div>
    </div>
  );
}

function News() {
  return (
    <div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">📰 Новини та оновлення</span>
          <h2>Важливі зміни для українців у Європі</h2>
          <p>
            Тут будуть актуальні новини про правила перебування,
            документи, допомогу та інші важливі зміни.
          </p>
        </div>
      </div>

      <div className="cards">
        <article className="card">
          <div className="card-icon">📌</div>
          <h3>Останні оновлення</h3>
          <p>Нові матеріали будуть додаватися з датою та посиланням на джерело.</p>
        </article>
      </div>
    </div>
  );
}
