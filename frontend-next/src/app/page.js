export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>📊 Stock Assistant</h1>
      <form action="http://localhost:3001/analyze" method="POST">
        <textarea
          name="prompt"
          rows="4"
          cols="50"
          placeholder="Введите запрос для анализа..."
          style={{ display: "block", marginBottom: "20px" }}
        />
        <button type="submit">Отправить</button>
      </form>
    </main>
  );
}
