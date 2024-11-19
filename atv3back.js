const jwt = require('jsonwebtoken'); // Biblioteca para trabalhar com JWT
const SECRET_KEY = 'sua_chave_secreta_aqui'; // Chave secreta para assinar o token

// Função responsável por gerar o token JWT
function do_Login(username) {
  const expirationTime = Math.floor(Date.now() / 1000) + (60 * 60); // Expira em 1 hora

  // Geração do token com expiração
  const jwt_token = jwt.sign({
    username: username,
    exp: expirationTime // Claim 'exp' com o tempo de expiração
  }, SECRET_KEY);

  return jwt_token;
}

function do_SomeAction(jwtToken) {
  try {
    const decoded = jwt.verify(jwtToken, SECRET_KEY);
    console.log('Ação realizada com sucesso!');

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { error: 'Token expirado, por favor faça login novamente.' };
    } else {
      return { error: 'Token inválido.' }; 
    }
  }
}
