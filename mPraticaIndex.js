const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { expressjwt: expressJwt } = require('express-jwt'); // Atualize a importação aqui

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const JWT_SECRET = 'your_jwt_secret_key';

app.post('/api/auth/login', (req, res) => {
  const credentials = req.body;
  const userData = doLogin(credentials);

  if (userData) {
    const token = jwt.sign({ usuario_id: userData.id, perfil: userData.perfil }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ sessionid: token });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

// Atualize o middleware para usar o `expressJwt`
app.use(expressJwt({ secret: JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/api/auth/login'] }));

app.get('/api/users', (req, res) => {
  const perfil = req.user.perfil;
  if (perfil !== 'admin') {
    res.status(403).json({ message: 'Forbidden' });
  } else {
    res.status(200).json({ data: users });
  }
});

app.get('/api/contracts', (req, res) => {
  const empresa = req.query.empresa;
  const dtInicio = req.query.inicio;

  const result = getContracts(empresa, dtInicio);
  if (result) {
    res.status(200).json({ data: result });
  } else {
    res.status(404).json({ data: 'Dados Não encontrados' });
  }
});

app.get('/api/me', (req, res) => {
  res.status(200).json({ user: req.user });
});

const users = [
  { "username": "user", "password": "123456", "id": 123, "email": "user@dominio.com", "perfil": "user" },
  { "username": "admin", "password": "123456789", "id": 124, "email": "admin@dominio.com", "perfil": "admin" },
  { "username": "colab", "password": "123", "id": 125, "email": "colab@dominio.com", "perfil": "user" }
];

function doLogin(credentials) {
  return users.find(item => credentials.username === item.username && credentials.password === item.password);
}

function getPerfil(userId) {
  const userData = users.find(item => item.id === userId);
  return userData ? userData.perfil : null;
}

function getContracts(empresa, inicio) {
  const repository = new Repository();
  const query = 'SELECT * FROM contracts WHERE empresa = ? AND data_inicio = ?';
  const result = repository.execute(query, [empresa, inicio]);
  return result;
}

class Repository {
  execute(query, params) {
    return [];
  }
}
