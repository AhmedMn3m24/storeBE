const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'School_DB'
});


db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to the database');
});


app.use(cors());

app.get('/Students', (req, res) => {
  const sql = 'SELECT * FROM Students';
  db.query(sql, (err, data) => {
    if (err) {
      return json({ message: "NOT FOUND" });
    }
    res.json(data);
  });
});


app.listen(8000, () => {
  console.log('Server running on port 8000');
});
