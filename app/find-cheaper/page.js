'use client';

import { useState } from 'react';

export default function FindCheaperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

  async function handleSearch() {
    const value = url.trim();

    if (!value) {
      setMessage('Вставте посилання на товар.');
      return;
    }

    if (!value.startsWith('http://') && !value.startsWith('https://')) {
      setMessage('Будь ласка, вставте повне посилання на товар.');
      return;
    }

    setMessage('Шукаємо товар...');

    try {
      let image = '';

      if (imageFile) {
        image = await new Promise((resolve, reject) => {
          const reader = new FileReader();

          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;

          reader.readAsDataURL(imageFile);
        });
      }

      const response = await fetch('/api/find-cheaper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: value,
          image: image,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        setMessage(data.error || 'Сталася помилка.');
        return;
      }

      setMessage(data.result || 'Товар визначено.');
    } catch (error) {
      setMessage('Не вдалося підключитися до пошуку.');
    }
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
        type="text"
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

      <div style={{ marginTop: '18px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '600',
          }}
        >
          📷 Додати фото товару
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
          }}
        />
      </div>

      <button
        onClick={handleSearch}
        style={{
          marginTop: '18px',
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
            whiteSpace: 'pre-wrap',
          }}
        >
          {message}
        </div>
      )}

      <div style={{ marginTop: '35px' }}>
        <h2 style={{ fontSize: '20px' }}>Як це працюватиме?</h2>

        <p>1. Вставляєте посилання на товар.</p>
        <p>2. Додаєте фото товару, якщо сайт не дає прочитати сторінку.</p>
        <p>3. Ми визначаємо товар і його характеристики.</p>
        <p>4. Шукаємо такий самий або максимально схожий товар.</p>
        <p>5. Показуємо, де вигідніше купити.</p>
      </div>
    </main>
  );
}
