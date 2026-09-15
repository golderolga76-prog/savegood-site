import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request, { params }) {
  const isVeo = params.site === 'veostudio';

  const title = isVeo ? 'Veo Studio' : 'SaveGood';
  const subtitle = isVeo
    ? 'AI Video Generator Online'
    : 'Корисні сервіси для українців у Європі';
  const domain = isVeo ? 'getveostudio.app' : 'savegood.store';
  const accent = isVeo ? '#8b5cf6' : '#2563eb';
  const accent2 = isVeo ? '#d946ef' : '#facc15';

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
              background: accent,
              fontSize: '38px',
            }}
          >
            {isVeo ? '▶' : 'S'}
          </div>
          {domain}
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
            {title}
          </div>
          <div
            style={{
              fontSize: '38px',
              lineHeight: 1.2,
              color: '#dbe4ff',
              maxWidth: '980px',
            }}
          >
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '26px' }}>
          <div style={{ width: '90px', height: '8px', borderRadius: '999px', background: accent }} />
          <div style={{ width: '45px', height: '8px', borderRadius: '999px', background: accent2 }} />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
