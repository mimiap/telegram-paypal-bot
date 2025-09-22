// PayPal webhook
app.post("/paypal-webhook", async (req, res) => {
  console.log("=== Webhook gautas ===");
  console.log("Webhook data:", req.body);

  // Pranešimas į Telegram
  await sendTelegramMessage(`Gautas PayPal webhook: ${JSON.stringify(req.body)}`);

  res.sendStatus(200);
});

// Testinis endpoint
app.get("/", (req, res) => {
  res.send("Serveris veikia 🚀");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Serveris paleistas ant porto ${PORT}`);
});
