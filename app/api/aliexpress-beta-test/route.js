export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feedUrl = process.env.ALIEXPRESS_BETA_FEED_URL;

    if (!feedUrl) {
      return Response.json(
        {
          ok: false,
          error: 'ALIEXPRESS_BETA_FEED_URL не знайдено.',
        },
        { status: 500 }
      );
    }

    const response = await fetch(feedUrl, {
      headers: {
        Range: 'bytes=0-15000',
      },
      cache: 'no-store',
    });

    const text = await response.text();

    return Response.json({
      ok: true,
      status: response.status,
      preview: text.slice(0, 2000),
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        ok: false,
        error: 'Не вдалося прочитати beta-фід.',
      },
      { status: 500 }
    );
  }
}
