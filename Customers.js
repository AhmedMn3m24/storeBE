  const express = require('express');
  const mysql = require('mysql2');
  const cors = require('cors');
  const bodyParser = require('body-parser');

  const app = express();

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

  app.post('/Customers', (req, res) => {
      const { name, email, phone} = req.body;
      console.log(req.body)
      if (!name || !email || !phone ) {
          return res.status(400).json({ message: " ُ Error 404" });
      }

      const sql = 'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)';
      db.query(sql, [name, email, phone], (err, result) => {
          if (err) {
              return res.status(500).json({ message: "Error 404" });
          }
          res.status(201).json({ message: "Record saved successfully", id: result.insertId });
      });
  });

  app.delete('/Customers/:id', (req, res) => {
      const { id } = req.params; 
      const sql = 'DELETE FROM customers WHERE ID = '+id;
      db.query(sql, (err, results) => {
          if (err) {
              return res.status(500).json({ message: "Error 404 customers" });
          }
          res.status(200).json(results);
      });
  }); 

 

  app.listen(7000, () => {
    console.log('Server running on port 7000');
  });
