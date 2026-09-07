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

Якщо є фото, використовуй його як головне джерело для визначення товару.

Поверни коротко українською:

Назва:
Категорія:
Основні характеристики:
Пошуковий запит для AliExpress:

Пошуковий запит для AliExpress зроби англійською мовою, коротким і придатним для пошуку такого самого або максимально схожого товару.
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

    return Response.json({
  ok: true,
  result:
    `Фото отримано сервером: ${image ? 'ТАК' : 'НІ'}\n\n` +
    (text || 'Товар не вдалося визначити.'),
});
  } catch (error) {
    console.error(error);

    return Response.json(
      { ok: false, error: 'Не вдалося визначити товар.' },
      { status: 500 }
    );
  }
}
