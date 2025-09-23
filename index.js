const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/paypal-webhook', (req, res) => {
  console.log('Webhook gautas:', req.body);
  res.send('OK');
});

app.listen(PORT, () => {
  console.log(`Serveris paleistas ant ${PORT}`);
});
