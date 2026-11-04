const { Router } = require('express');
const clientes = require('./controllers/clientesController');
const validar = require('./middlewares/validarCliente'); // Corrigido o nome do arquivo
const routes = Router();

routes.param('id', (req, res, next, valor) => {
  const id = Number(valor);
  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(400).json({ mensagem: 'Informe um id inteiro positivo.' });
  }
  next();
});

routes.get('/clientes', clientes.listar);
routes.post('/clientes', validar, clientes.cadastrar);
routes.put('/clientes/:id', validar, clientes.atualizar);
routes.delete('/clientes/:id', clientes.excluir);

module.exports = routes;