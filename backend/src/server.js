require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API de clientes em execução.' });
});

app.use(routes);

const porta = Number(process.env.PORTA_API || 3333);
app.listen(porta, '127.0.0.1', () => {
  console.log(`API em http://localhost:${porta}`);
});