export default function manifest() {
  return {
    name: 'SaveGood',
    short_name: 'SaveGood',
    description: 'Корисні сервіси для українців у Європі',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#f7fbfb',
    theme_color: '#13b8ae',
    lang: 'uk',
    icons: [
      {
        src: '/api/icon/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/api/icon/512',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
