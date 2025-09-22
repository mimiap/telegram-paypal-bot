import express from "express";

const app = express();
app.use(express.json());

// Telegram
import fetch from "node-fetch";

async function sendTelegramMessage(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.log("Telegram API raktai nesuvesti.");
    return;
  }
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text })
  });
}

// PayPal webhook
app.post("/paypal-webhook", async (req, res) => {
  console.log("=== Webhook gautas ===");
  console.log(req.body);

  // Pranešimas į Telegram
  await sendTelegramMessage(`Gautas PayPal webhook: ${JSON.stringify(req.body)}`);

  res.sendStatus(200);
});

// Testinis endpoint
app.get("/", (req, res) => {
  res.send("Serveris veikia 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveris paleistas ant porto ${PORT}`);
});
console.log("Webhook data:", req.body);
