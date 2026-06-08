const express = require('express');
const router = express.Router();

// livros
const livros = [
  { id: 1, titulo: "1984", autor: "George Orwell" },
  { id: 2, titulo: "Dom Casmurro", autor: "Machado de Assis" },
  { id: 3, titulo: "O Pequeno Príncipe", autor: "Saint-Exupéry" }
];

// listar livros
router.get('/', (req, res) => {
  res.json(livros);
});

//  buscar livro
router.get('/:id', (req, res) => {
  const livro = livros.find(l => l.id === parseInt(req.params.id));

  if (!livro) {
    return res.status(404).send('Livro não encontrado');
  }

  res.json(livro);
});

module.exports = router;