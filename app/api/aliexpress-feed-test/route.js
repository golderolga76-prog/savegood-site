export async function GET() {
  try {
    const feedUrl = process.env.ALIEXPRESS_FEED_URL;

    if (!feedUrl) {
      return Response.json(
        {
          ok: false,
          error: 'ALIEXPRESS_FEED_URL не знайдено у Vercel.',
        },
        { status: 500 }
      );
    }

    const response = await fetch(feedUrl, {
      headers: {
        Range: 'bytes=0-10000',
      },
      cache: 'no-store',
    });

    if (!response.ok && response.status !== 206) {
      return Response.json(
        {
          ok: false,
          error: `Admitad повернув статус ${response.status}`,
        },
        { status: 500 }
      );
    }

    const text = await response.text();

    return Response.json({
      ok: true,
      message: 'Фід AliExpress підключено.',
      preview: text.slice(0, 1000),
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        ok: false,
        error: 'Не вдалося прочитати фід AliExpress.',
      },
      { status: 500 }
    );
  }
}
