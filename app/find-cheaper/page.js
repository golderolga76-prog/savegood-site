'use client';

import { useState } from 'react';

export default function FindCheaperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');

  function handleSearch() {
    const value = url.trim();

    if (!value) {
      setMessage('Вставте посилання на товар.');
      return;
    }

    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      setMessage('Будь ласка, вставте повне посилання на товар.');
      return;
    }

    let shop = 'магазині';

    if (value.includes('temu.')) {
      shop = 'Temu';
    } else if (value.includes('aliexpress.')) {
      shop = 'AliExpress';
    } else if (value.includes('shein.')) {
      shop = 'SHEIN';
    } else if (value.includes('amazon.')) {
      shop = 'Amazon';
    }

    setMessage(
      `Посилання з ${shop} отримано. Наступним кроком підключимо пошук такого самого або схожого товару дешевше.`
    );
  }

  return (
    <main
      style={{
        padding: '40px 20px',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '700px',
        margin: '0 auto',
      }}
    >
      <h1>🔎 Знайти дешевше</h1>

      <p style={{ fontSize: '18px', lineHeight: '1.5' }}>
        Вставте посилання на товар — SaveGood допоможе знайти такий самий
        або схожий варіант дешевше.
      </p>

      <p style={{ marginTop: '12px' }}>
        Підтримуватимемо Temu, AliExpress, SHEIN, Amazon та інші магазини.
      </p>

      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Вставте посилання на товар"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '14px',
          fontSize: '16px',
          marginTop: '20px',
          borderRadius: '10px',
          border: '1px solid #ccc',
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          marginTop: '15px',
          padding: '14px 24px',
          fontSize: '16px',
          fontWeight: '600',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Знайти дешевше
      </button>

      {message && (
        <div
          style={{
            marginTop: '22px',
            padding: '16px',
            border: '1px solid #ddd',
            borderRadius: '10px',
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginTop: '35px' }}>
        <h2 style={{ fontSize: '20px' }}>Як це працюватиме?</h2>

        <p>1. Вставляєте посилання на товар.</p>
        <p>2. Ми визначаємо товар і його характеристики.</p>
        <p>3. Шукаємо такий самий або максимально схожий товар.</p>
        <p>4. Порівнюємо ціну та доступні варіанти.</p>
        <p>5. Показуємо, де вигідніше купити.</p>
      </div>
    </main>
  );
}
