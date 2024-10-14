const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'store'
});


db.connect(err => {
  if (err) {
    console.error('Database connection error:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.use(bodyParser.json());
app.use(cors());
app.post('/Contact', (req, res) => {
    console.log(req.body)
    const { name, email, phone, address, password } = req.body;
    
    if (!name || !email || !phone || !address || !password) {
        return res.status(400).json({ message: " ُ Error 404" });
    }
    
    const sql = 'INSERT INTO customers (name, email, phone, address, password) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [name, email, phone, address, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error saving the record" });
        }
        res.status(201).json({ message: "Record saved successfully", id: result.insertId });
    });
});

 

app.listen(7000, () => {
  console.log('Server running on port 7000');
});
