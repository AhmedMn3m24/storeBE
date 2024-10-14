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
        console.error('Database connection error', err.stack);
        return;
    }
    console.log('Connected to database');
});

app.use(cors());

app.get('/Store', (req, res) => {
    const sql = 'SELECT * FROM store';
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(404).json({ Message: 'NOT FOUND 404' });
        }
        console.log(data)

        res.json(data)
    });

});

app.listen(7000, () => {
    console.log('Listening on port 7000...');
})
