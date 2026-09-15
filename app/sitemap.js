export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: 'https://savegood.store/',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://savegood.store/ukrainians-in-europe',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: 'https://savegood.store/cheap-flights-europe',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/hotels-in-europe',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/find-cheaper-products',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/ai-services',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: 'https://savegood.store/dzlegko-telegram-bot',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/ai-assistant-telegram-bot',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/video-bot',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://savegood.store/flights',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://savegood.store/hotels',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://savegood.store/find-cheaper',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
