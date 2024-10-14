
const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
  
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'school_system'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database');
});
app.use(cors());

app.get('/data', (req, res) => {

  db.query('SELECT * FROM students', (err, results) => {
    if (err) {

      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

   
    res.json(results);
  })
});

app.get('/home', (req, res) => {
 
  db.query('SELECT * FROM school', (err, results) => {
    if (err) {
  
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  
    res.json(results);   
  })


})


app.get('/about', (req, res) => {
 
  db.query('SELECT * FROM class', (err, results) => {
    if (err) {
  
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  
    res.json(results);
  })


})


app.listen(3000, () => {
  console.log('Server running on port 3000');
});








