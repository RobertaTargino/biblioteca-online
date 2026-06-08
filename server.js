const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// rota inicial
app.get('/', (req, res) => {
  res.send('Biblioteca Online - Bem-vindo!');
});

// login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'admin@biblioteca.com' && password === '123456') {
    const token = jwt.sign(
      { email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.json({ token });
  }

  return res.status(401).json({ mensagem: 'Credenciais inválidas' });
});

// rotas de livros
const livrosRouter = require('./routes/livros');
app.use('/livros', livrosRouter);

// iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});