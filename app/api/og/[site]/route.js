import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const cards = {
  savegood: {
    title: 'SaveGood',
    subtitle: 'Корисні сервіси для українців у Європі',
    domain: 'savegood.store',
    icon: 'S',
    accent: '#2563eb',
    accent2: '#facc15',
  },
  veostudio: {
    title: 'Veo Studio',
    subtitle: 'AI Video Generator Online',
    domain: 'getveostudio.app',
    icon: '▶',
    accent: '#8b5cf6',
    accent2: '#d946ef',
  },
  dzlegko: {
    title: 'ДЗЛегко',
    subtitle: 'Допомога з домашнім завданням 5–9 клас',
    domain: 'savegood.store',
    icon: '📚',
    accent: '#2563eb',
    accent2: '#22c55e',
  },
  assistant: {
    title: 'AI Assistant',
    subtitle: 'AI-помічник у Telegram',
    domain: 'savegood.store',
    icon: '🤖',
    accent: '#7c3aed',
    accent2: '#38bdf8',
  },
  videobot: {
    title: 'AI Video Bot',
    subtitle: 'Створення AI-відео у Telegram',
    domain: 'savegood.store',
    icon: '🎬',
    accent: '#db2777',
    accent2: '#8b5cf6',
  },
};

export async function GET(request, { params }) {
  const card = cards[params.site] || cards.savegood;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#0b1020',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            fontSize: '30px',
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: card.accent,
              fontSize: '38px',
            }}
          >
            {card.icon}
          </div>
          {card.domain}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
          <div
            style={{
              fontSize: '82px',
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: '-3px',
              maxWidth: '1000px',
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              fontSize: '38px',
              lineHeight: 1.2,
              color: '#dbe4ff',
              maxWidth: '980px',
            }}
          >
            {card.subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '26px' }}>
          <div style={{ width: '90px', height: '8px', borderRadius: '999px', background: card.accent }} />
          <div style={{ width: '45px', height: '8px', borderRadius: '999px', background: card.accent2 }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
