const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'store',
});

app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";

    const values = [
        req.body.name,
        req.body.email,
        hashedPassword
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ message: "Error: " + err });
        }
        res.json({ message: "User registered successfully" });
    });
});

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ?";

    db.query(sql, [req.body.email], async (err, result) => {
        if (err) {
            return res.json("Error");
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "not found" });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // const isMatch = true
        //if(req.body.password!=user.password)
            // return res.status(401).json({ message: "Invalid" });

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid" });
        }

        const token = jwt.sign({ id: user.id }, 'your_jwt_secret');
        res.json({ message: "Login successful", token });
    });
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
