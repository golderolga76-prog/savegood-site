export default function FindCheaperPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif", maxWidth: "700px", margin: "0 auto" }}>
      <h1>Знайти дешевше</h1>

      <p>
        Вставте посилання на товар, і ми допоможемо знайти вигідніший варіант.
      </p>

      <input
        type="text"
        placeholder="Вставте посилання на товар"
        style={{
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #ccc"
        }}
      />

      <button
        style={{
          marginTop: "15px",
          padding: "14px 24px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Знайти дешевше
      </button>

      <p style={{ marginTop: "30px", fontSize: "14px" }}>
        Порівнюємо ціни, доставку та доступні варіанти в різних магазинах.
      </p>
    </main>
  );
}
