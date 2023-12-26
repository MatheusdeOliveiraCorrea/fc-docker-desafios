import express from "express";
import mysql from "mysql2";

const app = express(); 
const port = 90;

const config = {
  host     : 'banco-de-dados',
  user     : 'root',
  password : 'admin',
  database : 'dados'
};

var connection = mysql.createConnection(config);
connection.connect();

var pool = mysql.createPool(config);

pool.getConnection(function(err,connection){
  if(err) {
    console.log(err)
    return;
  }

  console.log('connected as id ' + connection.threadId);

  connection.release();
});

app.get("/", (req, res) => {
    const insertQuery = `INSERT INTO people (name) VALUES ('matheus ${Date.now().toString()}')`; 
    connection.query(insertQuery, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro interno do servidor');
        }

        const getQuery = `SELECT * FROM people`;
        connection.query(getQuery, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erro interno do servidor');
            }

            let html = "<h1>Full Cycle Rocks!</h1>\n<h3>Tabela people: (username + datetime to string) </h3>";

            for (let index = 0; index < result.length; index++) {
                html += `\n<h5>${result[index].name}</h5>`;
            }

            res.set('Content-Type', 'text/html');
            res.send(html);
        });
    });
});

app.listen({
    port: port,
    host: "0.0.0.0"
});