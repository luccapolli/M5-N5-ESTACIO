const express = require('express');
const jwt = require('jsonwebtoken'); 
const app = express();
const PORT = 3000;

const SECRET_KEY = 'sua_chave_secreta_aqui';

app.use(express.json());

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  
  if (!token) {
    return res.status(401).json({ message: 'Acesso não autorizado. Token ausente.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Acesso não autorizado. Token inválido.' });
    }
    
    req.user = user;  
    next();  
  });
};

app.get('/confidential-data', authenticateToken, (req, res) => {
  const jsonData = { secretData: 'Este é o dado confidencial que só usuários autenticados podem ver.' };

  res.json(jsonData);
});

app.post('/login', (req, res) => {
  const username = req.body.username;  // Agora `req.body` está disponível para uso

  if (!username) {
    return res.status(400).json({ message: 'Nome de usuário é necessário' });
  }

  const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });  // Token expira em 1 hora

  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
