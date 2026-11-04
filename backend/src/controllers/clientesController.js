const db = require('../database/connection');

async function listar(req, res) {
  try {
    const [dados] = await db.execute('SELECT * FROM clientes_aula ORDER BY id DESC');
    res.json({ dados });
  } catch (erro) {
    console.error(erro.code);
    res.status(500).json({ mensagem: 'Erro ao consultar o banco de dados.' });
  }
}

async function cadastrar(req, res) {
  const { nome, email, telefone } = req.body;
  try {
    const [resultado] = await db.execute(
      'INSERT INTO clientes_aula (nome, email, telefone) VALUES (?, ?, ?)',
      [nome, email, telefone]
    );
    res.status(201).json({ id: resultado.insertId });
  } catch (erro) {
    console.error(erro.code);
    res.status(500).json({ mensagem: 'Erro ao cadastrar.' });
  }
}

async function atualizar(req, res) {
  const { nome, email, telefone } = req.body;
  try {
    const [resultado] = await db.execute(
      'UPDATE clientes_aula SET nome = ?, email = ?, telefone = ? WHERE id = ?',
      [nome, email, telefone, req.params.id] // Corrigido de req.paramas para req.params
    );
    if (!resultado.affectedRows) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
    res.json({ mensagem: 'Cliente atualizado.' });
  } catch (erro) {
    console.error(erro.code);
    res.status(500).json({ mensagem: 'Erro ao atualizar.' });
  }
}

async function excluir(req, res) {
  try {
    const [resultado] = await db.execute(
      'DELETE FROM clientes_aula WHERE id = ?',
      [req.params.id]
    );
    if (!resultado.affectedRows) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
    }
    res.json({ mensagem: 'Cliente excluído.' });
  } catch (erro) {
    console.error(erro.code);
    res.status(500).json({ mensagem: 'Erro ao excluir.' });
  }
}

module.exports = { listar, cadastrar, atualizar, excluir };