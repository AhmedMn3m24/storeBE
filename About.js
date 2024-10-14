const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
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

  
app.use(cors());
app.get('/About', (req, res) => {
  const sql = 'SELECT * FROM about';
  
  db.query(sql, (err, data) => {
      if (err) {
          return res.status(404).json({ message: "NOT FOUND 404" });
      }
        
      res.json(data);
  }); 
});

 

app.listen(7000, () => {
  console.log('Server running on port 7000');
});
