const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Biblioteca Online',
      version: '1.0.0',
      description: 'Documentação da API da Biblioteca Online'
    },
    servers: [
      {
        url: 'https://biblioteca-online-bxyv.onrender.com'
      },
      {
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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