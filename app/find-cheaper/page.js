'use client';

import { useState } from 'react';

const countries = [
  ['gr', 'Греція'],
  ['de', 'Німеччина'],
  ['pl', 'Польща'],
  ['cz', 'Чехія'],
  ['it', 'Італія'],
  ['es', 'Іспанія'],
  ['fr', 'Франція'],
  ['ua', 'Україна'],
];

export default function FindCheaperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [product, setProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [offers, setOffers] = useState([]);
  const [pricingAvailable, setPricingAvailable] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [country, setCountry] = useState('gr');

  async function convertImageToJpeg(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          const maxSize = 1200;
          let width = img.width;
          let height = img.height;

          if (width > maxSize || height > maxSize) {
            const scale = Math.min(maxSize / width, maxSize / height);
            width = Math.round(width * scale);
            height = Math.round(height * scale);
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };

        img.onerror = () => reject(new Error('Не вдалося прочитати фото.'));
        img.src = reader.result;
      };

      reader.onerror = () => reject(new Error('Не вдалося прочитати файл.'));
      reader.readAsDataURL(file);
    });
  }

  async function handleSearch() {
    const value = url.trim();

    if (!value && !imageFile) {
      setMessage('Вставте посилання або додайте фото товару.');
      return;
    }

    if (value && !value.startsWith('http://') && !value.startsWith('https://')) {
      setMessage('Будь ласка, вставте повне посилання на товар.');
      return;
    }

    setProduct(null);
    setStores([]);
    setOffers([]);
    setPricingAvailable(false);

    try {
      let image = '';

      if (imageFile) {
        setMessage('Обробляємо фото...');
        image = await convertImageToJpeg(imageFile);
      }

      setMessage('Визначаємо товар і перевіряємо актуальні ціни...');

      const response = await fetch('/api/find-cheaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value, image, country }),
      });

      const data = await response.json();

      if (!data.ok) {
        setMessage(data.error || 'Сталася помилка.');
        return;
      }

      setProduct(data.product || null);
      setStores(data.stores || []);
      setOffers(data.offers || []);
      setPricingAvailable(Boolean(data.pricingAvailable));
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Не вдалося обробити фото або підключитися до пошуку.');
    }
  }

  return (
    <main style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>🔎 Знайти дешевше</h1>

      <p style={{ fontSize: '18px', lineHeight: '1.5' }}>
        Вставте посилання на товар або додайте фото. SaveGood визначить товар і покаже пропозиції з цінами на інших сайтах.
      </p>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Вставте посилання на товар"
        style={{ width: '100%', boxSizing: 'border-box', padding: '14px', fontSize: '16px', marginTop: '20px', borderRadius: '10px', border: '1px solid #ccc' }}
      />

      <div style={{ marginTop: '16px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>Країна пошуку</label>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ccc', fontSize: '16px' }}
        >
          {countries.map(([code, label]) => (
            <option key={code} value={code}>{label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '18px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>📷 Додати фото товару</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        />
        {imageFile && <p style={{ marginTop: '8px', fontSize: '14px' }}>Вибрано: {imageFile.name}</p>}
      </div>

      <button
        onClick={handleSearch}
        style={{ marginTop: '18px', padding: '14px 24px', fontSize: '16px', fontWeight: '600', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
      >
        Знайти дешевше
      </button>

      {message && (
        <div style={{ marginTop: '22px', padding: '16px', border: '1px solid #ddd', borderRadius: '10px', whiteSpace: 'pre-wrap' }}>
          {message}
        </div>
      )}

      {product && (
        <div style={{ marginTop: '22px', padding: '18px', border: '1px solid #ddd', borderRadius: '12px' }}>
          <h2 style={{ marginTop: 0 }}>{product.name}</h2>
          <p><strong>Категорія:</strong> {product.category}</p>
          <p><strong>Характеристики:</strong> {product.features}</p>

          <h3 style={{ marginTop: '26px', marginBottom: '10px' }}>Актуальні пропозиції з цінами</h3>

          {offers.length > 0 ? (
            <div style={{ display: 'grid', gap: '14px' }}>
              {offers.map((offer, index) => (
                <a
                  key={offer.id}
                  href={offer.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: offer.image ? '82px 1fr auto' : '1fr auto',
                    gap: '14px',
                    alignItems: 'center',
                    padding: '14px',
                    borderRadius: '12px',
                    border: index === 0 ? '2px solid #16a34a' : '1px solid #ddd',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: index === 0 ? '#f0fdf4' : '#fff',
                  }}
                >
                  {offer.image && (
                    <img
                      src={offer.image}
                      alt=""
                      style={{ width: '82px', height: '82px', objectFit: 'contain', borderRadius: '8px', background: '#f7f7f7' }}
                    />
                  )}

                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{offer.store}</div>
                    <div style={{ fontSize: '14px', lineHeight: 1.35 }}>{offer.title}</div>
                    {offer.delivery && <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>{offer.delivery}</div>}
                  </div>

                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                    {index === 0 && <div style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', marginBottom: '4px' }}>НАЙДЕШЕВШЕ</div>}
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>{offer.price}</div>
                    <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>Відкрити магазин →</div>
                  </div>
                </a>
              ))}
            </div>
          ) : pricingAvailable ? (
            <p>Для цього товару не вдалося знайти пропозиції з цінами. Спробуйте інше фото або посилання.</p>
          ) : (
            <p>Порівняння цін ще не підключене. Нижче можна відкрити пошук у магазинах.</p>
          )}

          <p style={{ marginTop: '14px', color: '#666', fontSize: '13px', lineHeight: 1.4 }}>
            Ціни та наявність можуть змінюватися на сайті продавця. Перед оплатою перевірте остаточну ціну, доставку та характеристики товару.
          </p>

          <h3 style={{ marginTop: '26px' }}>Пошук у магазинах</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {stores.map((store) => (
              <a
                key={store.name}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '12px 16px', borderRadius: '10px', textDecoration: 'none', border: '1px solid #ccc', fontWeight: '600' }}
              >
                {store.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '35px' }}>
        <h2 style={{ fontSize: '20px' }}>Як це працює?</h2>
        <p>1. Вставляєте посилання на товар або додаєте фото.</p>
        <p>2. SaveGood визначає товар і його основні характеристики.</p>
        <p>3. Пошук перевіряє актуальні торгові пропозиції для вибраної країни.</p>
        <p>4. Ви одразу бачите магазин, назву товару та ціну.</p>
        <p>5. Натискаєте на пропозицію і перевіряєте фінальну ціну на сайті продавця.</p>
      </div>
    </main>
  );
}
