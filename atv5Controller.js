const url = require('url');

const redirectUser = (req, res) => {
  const redirectUrl = req.query.url;

  // Lista de domínios permitidos
  const allowedDomains = ['dominio.com', 'localhost'];

  try {
    const parsedUrl = new URL(redirectUrl);
    
    if (!allowedDomains.includes(parsedUrl.hostname)) {
      return res.status(400).send('Redirecionamento bloqueado: domínio não permitido');
    }

    const sanitizedUrl = redirectUrl.replace(/(\r|\n)/g, '');

    res.redirect(sanitizedUrl);
  } catch (err) {
    return res.status(400).send('URL inválida.');
  }
};

module.exports = {
  redirectUser,
};
