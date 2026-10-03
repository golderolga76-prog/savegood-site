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

async function findShoppingOffers(query, country, sourceUrl) {
  const apiKey = process.env.SERPER_API_KEY;

  if (!apiKey || !query) {
    return { offers: [], pricingAvailable: false };
  }

  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey,
      },
      body: JSON.stringify({
        q: query,
        gl: country || 'gr',
        hl: 'en',
        num: 20,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Serper shopping error:', response.status, await response.text());
      return { offers: [], pricingAvailable: true };
    }

    const data = await response.json();
    const sourceToken = sourceTokenFromUrl(sourceUrl);

    const offers = (data.shopping || [])
      .filter((item) => item?.title && item?.price && item?.link)
      .filter((item) => {
        if (!sourceToken) return true;
        return !(item.source || '').toLowerCase().includes(sourceToken);
      })
      .map((item, index) => ({
        id: `${index}-${item.productId || item.title}`,
        title: item.title,
        store: item.source || 'Магазин',
        price: item.price,
        priceValue: parsePriceValue(item.price),
        link: item.link,
        image: item.imageUrl || item.thumbnail || '',
        delivery: item.delivery || '',
        rating: item.rating || null,
        reviews: item.ratingCount || item.reviews || null,
      }))
      .sort((a, b) => {
        if (a.priceValue == null && b.priceValue == null) return 0;
        if (a.priceValue == null) return 1;
        if (b.priceValue == null) return -1;
        return a.priceValue - b.priceValue;
      })
      .slice(0, 10);

    return { offers, pricingAvailable: true };
  } catch (error) {
    console.error('Serper shopping exception:', error);
    return { offers: [], pricingAvailable: true };
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const url = body?.url?.trim() || '';
    const image = body?.image || '';
    const country = body?.country || 'gr';

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
    const shopping = await findShoppingOffers(searchQuery, country, url);
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
