const mysql = require('mysql2');

function doDBAction(id) {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    database: 'mydatabase',
    password: 'password'
  });

  const query = 'SELECT * FROM users WHERE userID = ?';
  
  connection.execute(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao executar consulta:', err);
      return;
    }
    console.log(results);
  });

  connection.end();
}
