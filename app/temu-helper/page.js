'use client';

import { useState } from 'react';

export default function TemuHelperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [offers, setOffers] = useState([]);
  const [product, setProduct] = useState(null);
  const [couponFile, setCouponFile] = useState(null);
  const [cartTotal, setCartTotal] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [couponAnalysis, setCouponAnalysis] = useState(null);

  async function imageToJpeg(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1400;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#fff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

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

  async function analyzeCoupons() {
    if (!couponFile) {
      setCouponMessage('Додайте скриншот сторінки з купонами Temu.');
      return;
    }

    try {
      setCouponMessage('Розбираємо купони...');
      setCouponAnalysis(null);
      const image = await imageToJpeg(couponFile);
      const response = await fetch('/api/temu-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'coupons', image, cartTotal: cartTotal.trim() }),
      });
      const data = await response.json();
      if (!data.ok) {
        setCouponMessage(data.error || 'Не вдалося розібрати купони.');
        return;
      }
      setCouponAnalysis(data.couponAnalysis || null);
      setCouponMessage('');
    } catch (error) {
      console.error(error);
      setCouponMessage('Не вдалося обробити скриншот.');
    }
  }

  return (
    <main style={{ padding: '40px 20px', fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>🟠 Temu-помічник</h1>
      <p style={{ fontSize: '18px', lineHeight: 1.5 }}>
        Тут можна знайти дешевший варіант товару на самому Temu і розібратися, який купон вигідніше використати.
      </p>

      <section style={{ padding: '18px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0 }}>1. Знайти дешевший товар на Temu</h2>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Вставте посилання Temu" style={{ width: '100%', boxSizing: 'border-box', padding: '14px', fontSize: '16px', borderRadius: '10px', border: '1px solid #ccc' }} />
        <button onClick={searchTemu} style={{ marginTop: '14px', padding: '14px 22px', border: 0, borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Знайти дешевше на Temu</button>
        {message && <div style={{ marginTop: '16px', padding: '12px', background: '#f7f7f7', borderRadius: '10px' }}>{message}</div>}
      </section>

      {product && <section style={{ marginTop: '22px' }}><h2>{product.name}</h2><p>{product.features}</p></section>}

      {offers.length > 0 && (
        <section style={{ marginTop: '20px' }}>
          <h2>Знайдені варіанти на Temu</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            {offers.map((offer, index) => (
              <a key={offer.id} href={offer.link} target="_blank" rel="noopener noreferrer" style={{ display: 'grid', gridTemplateColumns: offer.image ? '80px 1fr auto' : '1fr auto', gap: '12px', alignItems: 'center', padding: '14px', border: index === 0 ? '2px solid #16a34a' : '1px solid #ddd', borderRadius: '12px', textDecoration: 'none', color: 'inherit', background: index === 0 ? '#f0fdf4' : '#fff' }}>
                {offer.image && <img src={offer.image} alt="" style={{ width: 80, height: 80, objectFit: 'contain', borderRadius: 8 }} />}
                <div><div style={{ fontWeight: 700 }}>{offer.title}</div><div style={{ fontSize: 13, color: '#666', marginTop: 4 }}>{offer.market}</div></div>
                <div style={{ textAlign: 'right' }}>{index === 0 && <div style={{ fontSize: 12, color: '#15803d', fontWeight: 700 }}>НАЙДЕШЕВШЕ</div>}<div style={{ fontSize: 20, fontWeight: 800 }}>{offer.price}</div></div>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 13, color: '#666' }}>Фінальна ціна в Temu може залежати від країни, акаунта, доставки та персональних акцій.</p>
        </section>
      )}

      <section style={{ marginTop: '34px', padding: '18px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0 }}>2. Який купон Temu використати?</h2>
        <p>Відкрийте в Temu список ваших купонів, зробіть скриншот і завантажте його сюди. Пароль від Temu не потрібен.</p>
        <label style={{ display: 'block', fontWeight: 700, marginTop: 12 }}>Сума кошика, € (необов’язково)</label>
        <input value={cartTotal} onChange={(e) => setCartTotal(e.target.value)} placeholder="Наприклад, 47.50" inputMode="decimal" style={{ width: '100%', boxSizing: 'border-box', padding: '12px', marginTop: 6, border: '1px solid #ccc', borderRadius: 10 }} />
        <label style={{ display: 'block', fontWeight: 700, marginTop: 14 }}>Скриншот купонів</label>
        <input type="file" accept="image/*" onChange={(e) => setCouponFile(e.target.files?.[0] || null)} style={{ marginTop: 8 }} />
        <button onClick={analyzeCoupons} style={{ marginTop: '14px', padding: '14px 22px', border: 0, borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>Підібрати найвигідніший купон</button>
        {couponMessage && <div style={{ marginTop: 14, padding: 12, background: '#f7f7f7', borderRadius: 10 }}>{couponMessage}</div>}

        {couponAnalysis && (
          <div style={{ marginTop: 18 }}>
            <p><strong>Що видно:</strong> {couponAnalysis.summary}</p>
            <p><strong>Що вигідніше:</strong> {couponAnalysis.bestOption}</p>
            {(couponAnalysis.coupons || []).map((coupon, index) => (
              <div key={index} style={{ marginTop: 10, padding: 12, border: '1px solid #ddd', borderRadius: 10 }}>
                <strong>{coupon.title}</strong>
                <div style={{ marginTop: 4 }}>{coupon.condition}</div>
                {coupon.expires && <div style={{ marginTop: 4 }}>Термін: {coupon.expires}</div>}
                <div style={{ marginTop: 4 }}>Можна використати зараз: {coupon.usableNow}</div>
                {coupon.note && <div style={{ marginTop: 4, color: '#555' }}>{coupon.note}</div>}
              </div>
            ))}
            {(couponAnalysis.warnings || []).length > 0 && <p style={{ marginTop: 12 }}><strong>Зверніть увагу:</strong> {couponAnalysis.warnings.join(' ')}</p>}
          </div>
        )}
      </section>

      <section style={{ marginTop: '24px', padding: '18px', border: '1px solid #ddd', borderRadius: '12px' }}>
        <h2 style={{ marginTop: 0 }}>3. Після покупки</h2>
        <p>Якщо ціна того самого товару в того самого продавця знизилася, перевірте в замовленні кнопку <strong>Price adjustment</strong>. Temu описує повернення різниці для відповідних замовлень протягом 30 днів.</p>
      </section>
    </main>
  );
}
