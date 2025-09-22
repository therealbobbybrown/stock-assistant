import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();
console.log("URL:", process.env.SUPABASE_URL);
console.log("KEY:", process.env.SUPABASE_KEY ? "Loaded" : "Missing");

const app = express();
app.use(express.json());

// Подключение к Supabase через переменные окружения
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

app.get("/", (req, res) => {
  res.send("🚀 Assistant OK");
});

// Добавление истории
app.post("/history", async (req, res) => {
  const { user_input, assistant_output } = req.body;
  const { data, error } = await supabase
    .from("history")
    .insert([{ user_input, assistant_output }])
    .select();
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// Получение истории
app.get("/history", async (req, res) => {
  const { data, error } = await supabase
    .from("history")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
