import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// reikalinga, kad Express galėtų surasti HTML failą
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// nurodom aplanką, kuriame yra tavo HTML failai (čia root folderis)
app.use(express.static(__dirname));

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

// Telegram webhook
app.post("/telegram-webhook", async (req, res) => {
  const message = req.body.message;

  if (message) {
    const chatId = message.chat.id;
    console.log("Gautas chat.id:", chatId);

    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `Tavo chat.id yra: ${chatId}`,
      }),
    });
  }

  res.sendStatus(200);
});

// PayPal webhook
app.post("/paypal-webhook", (req, res) => {
  console.log("PayPal webhook data:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Serveris paleistas ant porto ${PORT}`);
});
