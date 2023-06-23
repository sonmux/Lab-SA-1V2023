const express = require('express');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
  host: 'db', // nombre del servicio de la base de datos en el archivo docker-compose.yml
  port:'3306',
  user: 'root',
  password: 'password',
  database: 'mydatabase', 
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM alumno', (error, results) => {
    if (error) {
      throw error;
    }
    res.send({"alumno":results[0].nombre});
  });
});

const port = 80;
app.listen(port, () => {
  console.log(`Servidor en puerto ${port}`);
});