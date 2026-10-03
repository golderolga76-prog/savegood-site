'use client';

import { useState } from 'react';

export default function TemuHelperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [offers, setOffers] = useState([]);
  const [product, setProduct] = useState(null);

  async function searchTemu() {
    const value = url.trim();
    if (!value || !value.includes('temu.')) {
      setMessage('Вставте посилання на товар з Temu.');
      return;
    }

    setMessage('Шукаємо дешевші варіанти на Temu...');
    setOffers([]);
    setProduct(null);

    try {
      const response = await fetch('/api/temu-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value }),
      });
      const data = await response.json();
      if (!data.ok) {
        setMessage(data.error || 'Сталася помилка.');
        return;
      }
      setProduct(data.product || null);
      setOffers(data.offers || []);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Не вдалося виконати пошук.');
    }
  }

  return (
    <main style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>🟠 Temu-помічник</h1>
      <p style={{ fontSize: '18px', lineHeight: 1.5 }}>
        Вставте посилання на товар Temu. SaveGood спробує знайти дешевші схожі пропозиції на самому Temu.
      </p>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Вставте посилання Temu"
        style={{ width: '100%', boxSizing: 'border-box', padding: '14px', fontSize: '16px', marginTop: '16px', borderRadius: '10px', border: '1px solid #ccc' }}
      />

      <button onClick={searchTemu} style={{ marginTop: '16px', padding: '14px 22px', border: 0, borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
        Знайти дешевше на Temu
      </button>

      {message && <div style={{ marginTop: '20px', padding: '14px', border: '1px solid #ddd', borderRadius: '10px' }}>{message}</div>}

      {product && (
        <section style={{ marginTop: '24px' }}>
          <h2>{product.name}</h2>
          <p>{product.features}</p>
        </section>
      )}

      {offers.length > 0 && (
        <section style={{ marginTop: '20px' }}>
          <h2>Дешевші варіанти на Temu</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {offers.map((offer, index) => (
              <a key={offer.id} href={offer.link} target="_blank" rel="noopener noreferrer" style={{ display: 'grid', gridTemplateColumns: offer.image ? '80px 1fr auto' : '1fr auto', gap: '12px', alignItems: 'center', padding: '14px', border: index === 0 ? '2px solid #16a34a' : '1px solid #ddd', borderRadius: '12px', textDecoration: 'none', color: 'inherit', background: index === 0 ? '#f0fdf4' : '#fff' }}>
                {offer.image && <img src={offer.image} alt="" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8 }} />}
                <div>
                  <div style={{ fontWeight: 700 }}>{offer.title}</div>
                  <div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{offer.market}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {index === 0 && <div style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>НАЙДЕШЕВШЕ</div>}
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{offer.price}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section style={{ marginTop: '34px', padding: '18px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0 }}>Купони та акції Temu</h2>
        <p>Купони в Temu часто персональні. SaveGood не просить пароль від Temu і не підключається до вашого акаунта.</p>
        <p>Відкрийте в Temu список купонів і використайте той, у якого виконана мінімальна сума замовлення. Після покупки також перевіряйте Price adjustment, якщо ціна товару знизилася.</p>
      </section>
    </main>
  );
}
