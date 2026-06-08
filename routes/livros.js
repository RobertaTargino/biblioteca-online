const express = require('express');
const router = express.Router();

const { autenticarJWT } = require('../src/middlewares/autenticacao');

const livros = [
  { id: 1, titulo: '1984', autor: 'George Orwell' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' },
  { id: 3, titulo: 'O Pequeno Príncipe', autor: 'Saint-Exupéry' }
];

/**
 * @swagger
 * tags:
 *   name: Livros
 *   description: Rotas da biblioteca online
 */

/**
 * @swagger
 * /livros:
 *   get:
 *     summary: Lista todos os livros
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de livros retornada com sucesso
 *       403:
 *         description: Token não fornecido ou inválido
 */
router.get('/', autenticarJWT, (req, res) => {
  res.json(livros);
});

/**
 * @swagger
 * /livros/{id}:
 *   get:
 *     summary: Busca um livro pelo ID
 *     tags: [Livros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do livro
 *     responses:
 *       200:
 *         description: Livro encontrado
 *       403:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Livro não encontrado
 */
router.get('/:id', autenticarJWT, (req, res) => {
  const id = parseInt(req.params.id);
  const livro = livros.find(l => l.id === id);

  if (!livro) {
    return res.status(404).json({ mensagem: 'Livro não encontrado' });
  }

  res.json(livro);
});

module.exports = router;