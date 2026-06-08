const jwt = require('jsonwebtoken');

function autenticarJWT(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ mensagem: 'Token não fornecido' });
  }

  try {
    const dados = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dados;
    next();
  } catch (error) {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }
}

module.exports = { autenticarJWT };