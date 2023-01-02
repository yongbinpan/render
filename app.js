const express = require("express");
require('dotenv').config();
var pg = require('pg');
const app = express();
const port = process.env.PORT;
var conString = process.env.POSTGRES_CONN;

var client = new pg.Client(conString);
client.connect();

app.get("/:id", async (req, res) => {

  const { id } = req.params
  const { rows } = await client.query('SELECT * FROM books WHERE id = $1', [id])
  res.send(rows[0])

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
