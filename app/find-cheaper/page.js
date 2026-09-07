'use client';

import { useState } from 'react';

export default function FindCheaperPage() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);

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

          const jpegData = canvas.toDataURL('image/jpeg', 0.9);

          resolve(jpegData);
        };

        img.onerror = () => {
          reject(new Error('Не вдалося прочитати фото.'));
        };

        img.src = reader.result;
      };

      reader.onerror = () => {
        reject(new Error('Не вдалося прочитати файл.'));
      };

      reader.readAsDataURL(file);
    });
  }

  async function handleSearch() {
    const value = url.trim();

    if (!value && !imageFile) {
      setMessage('Вставте посилання або додайте фото товару.');
      return;
    }

    if (
      value &&
      !value.startsWith('http://') &&
      !value.startsWith('https://')
    ) {
      setMessage('Будь ласка, вставте повне посилання на товар.');
      return;
    }

    setMessage('Шукаємо товар...');

    try {
      let image = '';

      if (imageFile) {
        setMessage('Обробляємо фото...');
        image = await convertImageToJpeg(imageFile);
      }

      setMessage('Шукаємо товар...');

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
      console.error(error);
      setMessage('Не вдалося обробити фото або підключитися до пошуку.');
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

      <p
        style={{
          fontSize: '18px',
          lineHeight: '1.5',
        }}
      >
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
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setImageFile(file);
          }}
        />

        {imageFile && (
          <p
            style={{
              marginTop: '8px',
              fontSize: '14px',
            }}
          >
            Вибрано: {imageFile.name}
          </p>
        )}
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
