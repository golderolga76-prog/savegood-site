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

    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-5.6-luna',
        tools: [{ type: 'web_search_preview' }],
        input: `
Визнач товар за цим посиланням:

${url}

Спробуй знайти інформацію про цю сторінку або товар через веб-пошук.

Поверни коротко українською:
Назва:
Категорія:
Характеристики:
Пошуковий запит для AliExpress:
        `,
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
      result: text,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { ok: false, error: 'Не вдалося визначити товар.' },
      { status: 500 }
    );
  }
}
