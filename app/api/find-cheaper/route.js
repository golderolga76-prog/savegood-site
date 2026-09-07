export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url?.trim();

    if (!url) {
      return Response.json(
        { ok: false, error: 'Посилання не передано.' },
        { status: 400 }
      );
    }

    let shop = 'other';

    if (url.includes('temu.')) {
      shop = 'temu';
    } else if (url.includes('aliexpress.')) {
      shop = 'aliexpress';
    } else if (url.includes('shein.')) {
      shop = 'shein';
    } else if (url.includes('amazon.')) {
      shop = 'amazon';
    }

    return Response.json({
      ok: true,
      shop,
      url,
    });
  } catch (error) {
    return Response.json(
      { ok: false, error: 'Не вдалося обробити запит.' },
      { status: 500 }
    );
  }
}
