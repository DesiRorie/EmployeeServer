// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const mysql = require("mysql2/promise");

// dotenv.config();

// const app = express();

// app.use(express.json());

// app.use(cors());

// const urlDb = {
//   host: process.env.MYSQLHOST,
//   user: process.env.MYSQLUSER,
//   password: process.env.MYSQLPASSWORD,
//   database: process.env.MYSQLDATABASE,
//   port: process.env.MYSQLPORT,
// };

// const createConnection = async () => {
//   try {
//     const connection = await mysql.createConnection(urlDb);
//     console.log("Connected to the database!");
//     return connection;
//   } catch (err) {
//     console.error("Error connecting to the database:", err);
//     throw err;
//   }
// };

// const dbPromise = createConnection();
// app.post("/api/employees", async (req, res) => {
//   try {
//     const db = await dbPromise;
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const phone = req.body.phone;

//     await db.query(
//       "INSERT INTO employees (firstName, lastName, phone) VALUES (?, ?, ?)",
//       [firstName, lastName, phone]
//     );
//     db.end();
//     res.send("Post inserted");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error inserting post");
//   }
// });

// app.get("/api/employees", async (req, res) => {
//   try {
//     const db = await dbPromise;
//     await db.query("SELECT * FROM employees");
//     const [result] = await db.query("SELECT * FROM employees");

//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error fetching posts");
//   }
// });
// app.get("/api/posts", (req, res) => {
//   res.send("hellllllooooooo");
// });

// app.listen(process.env.PORT || 9000, "0.0.0.0", () => {
//   console.log("Server started");
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const urlDb = {
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
};

const createPool = async () => {
  try {
    const pool = await mysql.createPool(urlDb);
    console.log("Connected to the database!");
    return pool;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
};

const poolPromise = createPool();

app.post("/api/employees", async (req, res) => {
  try {
    const pool = await poolPromise;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;

    await pool.query(
      "INSERT INTO employees (firstName, lastName, phone) VALUES (?, ?, ?)",
      [firstName, lastName, phone]
    );

    res.send("Post inserted");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error inserting post");
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const pool = await poolPromise;
    const [result] = await pool.query("SELECT * FROM employees");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching posts");
  }
});

app.get("/api/posts", (req, res) => {
  res.send("hellllllooooooo");
});

app.listen(process.env.PORT || 9000, "0.0.0.0", () => {
  console.log("Server started");
});
