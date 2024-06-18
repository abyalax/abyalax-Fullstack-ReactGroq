const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const response = require("./response");
// Hash passsword
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_groq",
});

database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to Database");
  }
});
// ambil semua data user dari database
app.get("/api/v1/users", (req, res) => {
  database.query("SELECT * FROM users", (err, user) => {
    if (err) throw err;
    response(200, "Get data users", user, res);
  });
});

// Method Register
app.post("/api/v1/users", (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hash;
  const data = [req.body.username, req.body.email, req.body.password];
  const sql = "INSERT INTO  users (username, email, password) VALUES (?,?,?)";
  database.query(sql, data, (err, result) => {
    if (err) throw err;
    response(200, "Insert data users", result, res);
  });
});

// Method Login
app.post("/api/v1/users/login", (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  database.query(sql, [email], (err, users) => {
    if (err) throw err;
    if (users.length > 0) {
      const user = users[0];
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        response(200, "Login successful", user, res);
      } else {
        response(401, "Invalid email or password", null, res);
      }
    } else {
      response(401, "Invalid email or password", null, res);
    }
  });
});

// Method Delete
app.delete("/api/v1/users/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM users WHERE id = ?";
  database.query(sql, [id], (err, result) => {
    if (err) throw err;
    response(200, "Delete data users", result, res);
  });
});

// Save messages user dan bot
app.post("/api/v1/messages", (req, res) => {
const data = [req.body.userId, req.body.sender, req.body.textMessage];
  const sql = "INSERT INTO messages (user_id, sender, text_message) VALUES (?, ?, ?)";
  database.query(sql, data, (err, result) => {
    if (err) throw err;
    response(200, "Message saved successfully", result, res);
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
