const express = require('express');
const router = express.Router();

const { autenticarJWT } = require('../src/middlewares/autenticacao');

const livros = [
  { id: 1, titulo: '1984', autor: 'George Orwell' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  { id: 3, titulo: 'O Pequeno Príncipe', autor: 'Saint-Exupéry' }
];

// listar livros
router.get('/', autenticarJWT, (req, res) => {
  res.json(livros);
});

// buscar livro por id
router.get('/:id', autenticarJWT, (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  res.json(livro);
});

module.exports = router;