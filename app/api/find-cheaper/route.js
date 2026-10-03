function parsePriceValue(price) {
  if (!price || typeof price !== 'string') return null;

  let value = price.replace(/[^0-9.,]/g, '');
  if (!value) return null;

  const lastComma = value.lastIndexOf(',');
  const lastDot = value.lastIndexOf('.');

  if (lastComma !== -1 && lastDot !== -1) {
    const decimalSeparator = lastComma > lastDot ? ',' : '.';
    const thousandsSeparator = decimalSeparator === ',' ? '.' : ',';
    value = value.split(thousandsSeparator).join('');
    value = value.replace(decimalSeparator, '.');
  } else if (lastComma !== -1) {
    const decimals = value.length - lastComma - 1;
    value = decimals === 2 ? value.replace(',', '.') : value.replace(/,/g, '');
  } else if (lastDot !== -1) {
    const decimals = value.length - lastDot - 1;
    value = decimals === 2 ? value : value.replace(/\./g, '');
  }

  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : null;
}

function detectCurrency(price) {
  const text = String(price || '').toLowerCase();
  if (text.includes('€') || text.includes('eur')) return 'EUR';
  if (text.includes('£') || text.includes('gbp')) return 'GBP';
  if (text.includes('zł') || text.includes('pln')) return 'PLN';
  if (text.includes('$') || text.includes('usd')) return 'USD';
  return null;
}

function sourceTokenFromUrl(url) {
  if (!url) return '';

  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes('temu.')) return 'temu';
    if (host.includes('shein.')) return 'shein';
    if (host.includes('amazon.')) return 'amazon';
    if (host.includes('aliexpress.')) return 'aliexpress';
    if (host.includes('ebay.')) return 'ebay';
  } catch {}

  return '';
}

async function getEuroRates() {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=EUR', {
      cache: 'no-store',
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data?.rates || null;
  } catch {
    return null;
  }
}

function convertToEuro(value, currency, rates) {
  if (value == null || !currency) return null;
  if (currency === 'EUR') return value;
  const rate = rates?.[currency];
  if (!rate) return null;
  return value / rate;
}

async function searchMarket(query, market, apiKey) {
  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        q: query,
        gl: market,
        hl: 'en',
        num: 12,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Serper shopping error:', market, response.status, await response.text());
      return [];
    }

    const data = await response.json();
    return (data.shopping || []).map((item) => ({ ...item, market }));
  } catch (error) {
    console.error('Serper shopping exception:', market, error);
    return [];
  }
}

async function findShoppingOffers(query, sourceUrl) {
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey || !query) {
    return { offers: [], pricingAvailable: false };
  }

  const markets = ['gr', 'de', 'fr', 'it', 'es', 'us'];
  const [marketResults, rates] = await Promise.all([
    Promise.all(markets.map((market) => searchMarket(query, market, apiKey))),
    getEuroRates(),
  ]);

  const sourceToken = sourceTokenFromUrl(sourceUrl);
  const seen = new Set();

  const offers = marketResults
    .flat()
    .filter((item) => item?.title && item?.price && item?.link)
    .filter((item) => {
      if (!sourceToken) return true;
      return !(item.source || '').toLowerCase().includes(sourceToken);
    })
    .map((item, index) => {
      const priceValue = parsePriceValue(item.price);
      const currency = detectCurrency(item.price);
      const priceValueEur = convertToEuro(priceValue, currency, rates);

      return {
        id: `${item.market}-${index}-${item.productId || item.title}`,
        title: item.title,
        store: item.source || 'Магазин',
        price: item.price,
        priceValue,
        priceValueEur,
        currency,
        link: item.link,
        image: item.imageUrl || item.thumbnail || '',
        delivery: item.delivery || '',
        rating: item.rating || null,
        reviews: item.ratingCount || item.reviews || null,
        market: item.market,
      };
    })
    .filter((item) => {
      const key = `${item.store}|${item.title}|${item.price}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => {
      if (a.priceValueEur == null && b.priceValueEur == null) return 0;
      if (a.priceValueEur == null) return 1;
      if (b.priceValueEur == null) return -1;
      return a.priceValueEur - b.priceValueEur;
    })
    .slice(0, 12);

  return { offers, pricingAvailable: true };
}

export async function POST(request) {
  try {
    const body = await request.json();

    const url = body?.url?.trim() || '';
    const image = body?.image || '';

    if (!url && !image) {
      return Response.json(
        { ok: false, error: 'Додайте посилання або фото товару.' },
        { status: 400 }
      );
    }

    const content = [
      {
        type: 'input_text',
        text: `
Визнач товар максимально точно.

Посилання:
${url || 'не вказано'}

Якщо є фото, використовуй його як головне джерело.

Поверни ТІЛЬКИ JSON без markdown:

{
  "name": "назва товару українською",
  "category": "категорія українською",
  "features": "короткі основні характеристики українською",
  "searchQuery": "короткий точний англомовний пошуковий запит для Google Shopping, без назв магазинів"
}
        `,
      },
    ];

    if (image) {
      content.push({
        type: 'input_image',
        image_url: image,
      });
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        input: [
          {
            role: 'user',
            content,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data);

      return Response.json(
        { ok: false, error: 'Помилка OpenAI.' },
        { status: 500 }
      );
    }

    const text =
      data.output
        ?.filter((item) => item.type === 'message')
        .flatMap((item) => item.content || [])
        .find((item) => item.type === 'output_text')
        ?.text || '';

    let product;

    try {
      product = JSON.parse(text);
    } catch {
      return Response.json(
        { ok: false, error: 'Не вдалося розібрати відповідь про товар.' },
        { status: 500 }
      );
    }

    const searchQuery = product.searchQuery || product.name || '';
    const shopping = await findShoppingOffers(searchQuery, url);
    const q = encodeURIComponent(searchQuery);

    const stores = [
      {
        name: 'AliExpress',
        url: `https://www.aliexpress.com/wholesale?SearchText=${q}`,
      },
      {
        name: 'Temu',
        url: `https://www.temu.com/search_result.html?search_key=${q}`,
      },
      {
        name: 'Amazon',
        url: `https://www.amazon.com/s?k=${q}`,
      },
      {
        name: 'SHEIN',
        url: `https://www.shein.com/pdsearch/${q}/`,
      },
      {
        name: 'eBay',
        url: `https://www.ebay.com/sch/i.html?_nkw=${q}`,
      },
      {
        name: 'Banggood',
        url: `https://www.banggood.com/search/${q}.html`,
      },
      {
        name: 'Skroutz',
        url: `https://www.skroutz.gr/search?keyphrase=${q}`,
      },
    ];

    return Response.json({
      ok: true,
      product: {
        name: product.name || '-',
        category: product.category || '-',
        features: product.features || '-',
      },
      offers: shopping.offers,
      pricingAvailable: shopping.pricingAvailable,
      stores,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { ok: false, error: 'Не вдалося визначити товар.' },
      { status: 500 }
    );
  }
}
