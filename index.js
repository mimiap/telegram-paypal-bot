import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const token = process.env.TELEGRAM_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

// Funkcija siųsti žinutę į Telegram
async function sendTelegramMessage(text) {
  if (!token || !chatId) {
    console.error("❌ Telegram API raktai nesuvesti.");
    return;
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

// PayPal webhook endpoint
app.post("/paypal-webhook", async (req, res) => {
  console.log("=== Webhook gautas ===");
  console.log("Webhook data:", req.body);

  try {
    await sendTelegramMessage(
      `💰 Gautas PayPal webhook: ${JSON.stringify(req.body)}`
    );
  } catch (err) {
    console.error("❌ Klaida siunčiant į Telegram:", err);
  }

  res.sendStatus(200);
});

// Testinis endpoint
app.get("/", (req, res) => {
  res.send("✅ Serveris veikia 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Serveris paleistas ant porto ${PORT}`);
});
