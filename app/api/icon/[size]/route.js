import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET(request, { params }) {
  const requested = Number(params.size);
  const size = requested === 512 ? 512 : 192;
  const radius = Math.round(size * 0.24);
  const fontSize = Math.round(size * 0.46);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #27c8bd, #0da69e)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
          fontSize,
          fontWeight: 800,
          borderRadius: radius,
        }}
      >
        S
      </div>
    ),
    { width: size, height: size }
  );
}
