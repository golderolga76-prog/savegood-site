'use client';

import { track } from '@vercel/analytics';

export default function ShareButtons({ title = 'SaveGood' }) {
  const getUrl = () => window.location.href.split('#')[0];

  const shareNative = async () => {
    const url = getUrl();
    track('share_click', { channel: 'native', page: url });
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error) {
        if (error?.name === 'AbortError') return;
      }
    }
    await copyLink();
  };

  const shareTelegram = () => {
    const url = getUrl();
    track('share_click', { channel: 'telegram', page: url });
    window.open(
      'https://t.me/share/url?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareWhatsApp = () => {
    const url = getUrl();
    track('share_click', { channel: 'whatsapp', page: url });
    window.open(
      'https://wa.me/?text=' + encodeURIComponent(title + ' ' + url),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const copyLink = async () => {
    const url = getUrl();
    track('share_click', { channel: 'copy', page: url });
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  };

  const buttonStyle = {
    border: '1px solid rgba(148,163,184,.35)',
    borderRadius: '12px',
    padding: '10px 14px',
    background: 'transparent',
    cursor: 'pointer',
    font: 'inherit',
  };

  return (
    <section style={{ marginTop: '34px' }} aria-label="Поділитися сторінкою">
      <strong>Поділитися:</strong>
      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <button type="button" style={buttonStyle} onClick={shareNative}>Поділитися</button>
        <button type="button" style={buttonStyle} onClick={shareTelegram}>Telegram</button>
        <button type="button" style={buttonStyle} onClick={shareWhatsApp}>WhatsApp</button>
        <button type="button" style={buttonStyle} onClick={copyLink}>Копіювати посилання</button>
      </div>
    </section>
  );
}
