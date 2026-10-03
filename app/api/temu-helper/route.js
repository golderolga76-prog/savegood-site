function parsePriceValue(price) {
  if (!price || typeof price !== 'string') return null;
  let value = price.replace(/[^0-9.,]/g, '');
  if (!value) return null;
  const comma = value.lastIndexOf(',');
  const dot = value.lastIndexOf('.');
  if (comma !== -1 && dot !== -1) {
    const decimal = comma > dot ? ',' : '.';
    const thousands = decimal === ',' ? '.' : ',';
    value = value.split(thousands).join('').replace(decimal, '.');
  } else if (comma !== -1) {
    value = value.length - comma - 1 === 2 ? value.replace(',', '.') : value.replace(/,/g, '');
  } else if (dot !== -1 && value.length - dot - 1 !== 2) {
    value = value.replace(/\./g, '');
  }
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

function getText(data) {
  return data.output
    ?.filter((item) => item.type === 'message')
    .flatMap((item) => item.content || [])
    .find((item) => item.type === 'output_text')
    ?.text || '';
}

async function identifyProduct(url) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-5.6-luna',
      input: [{
        role: 'user',
        content: [{
          type: 'input_text',
          text: `Визнач товар за цим посиланням Temu максимально точно: ${url}\n\nПоверни тільки JSON без markdown:\n{"name":"назва українською","features":"короткі характеристики українською","searchQuery":"короткий точний запит англійською без слова Temu"}`,
        }],
      }],
    }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error('OpenAI error');
  const text = getText(data).trim().replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  return JSON.parse(text);
}

async function searchMarket(query, gl, market, apiKey) {
  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({ q: `${query} Temu`, gl, hl: 'en', num: 20 }),
      cache: 'no-store',
    });

    if (!response.ok) return [];
    const data = await response.json();

    return (data.shopping || [])
      .filter((item) => item?.title && item?.price && item?.link)
      .filter((item) => {
        const source = String(item.source || '').toLowerCase();
        const link = String(item.link || '').toLowerCase();
        return source.includes('temu') || link.includes('temu.com');
      })
      .map((item, index) => ({
        id: `${gl}-${index}-${item.productId || item.title}`,
        title: item.title,
        price: item.price,
        priceValue: parsePriceValue(item.price),
        link: item.link,
        image: item.imageUrl || item.thumbnail || '',
        market,
      }));
  } catch (error) {
    console.error('Temu search error:', gl, error);
    return [];
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url?.trim() || '';

    if (!url || !url.includes('temu.')) {
      return Response.json({ ok: false, error: 'Вставте посилання на товар з Temu.' }, { status: 400 });
    }

    const product = await identifyProduct(url);
    const apiKey = process.env.SERPER_API_KEY;
    if (!apiKey) {
      return Response.json({ ok: false, error: 'Пошук цін ще не підключений.' }, { status: 500 });
    }

    const markets = [
      ['gr', 'Греція'],
      ['de', 'Німеччина'],
      ['fr', 'Франція'],
      ['es', 'Іспанія'],
    ];

    const results = await Promise.all(
      markets.map(([gl, market]) => searchMarket(product.searchQuery || product.name || '', gl, market, apiKey))
    );

    const seen = new Set();
    const offers = results.flat()
      .filter((offer) => {
        const key = `${offer.title.toLowerCase()}|${offer.price}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => {
        if (a.priceValue == null && b.priceValue == null) return 0;
        if (a.priceValue == null) return 1;
        if (b.priceValue == null) return -1;
        return a.priceValue - b.priceValue;
      })
      .slice(0, 12);

    return Response.json({
      ok: true,
      product: {
        name: product.name || '-',
        features: product.features || '-',
      },
      offers,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ ok: false, error: 'Не вдалося виконати пошук на Temu.' }, { status: 500 });
  }
}
