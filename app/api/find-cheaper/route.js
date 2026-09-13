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
  "searchQuery": "короткий англомовний пошуковий запит для пошуку такого самого або максимально схожого товару"
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

    const q = encodeURIComponent(product.searchQuery || product.name || '');

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

    const result =
      `Назва: ${product.name || '-'}\n` +
      `Категорія: ${product.category || '-'}\n` +
      `Основні характеристики: ${product.features || '-'}\n\n` +
      `Пошук у магазинах:\n\n` +
      stores.map((store) => `${store.name}: ${store.url}`).join('\n');

    return Response.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { ok: false, error: 'Не вдалося визначити товар.' },
      { status: 500 }
    );
  }
}
