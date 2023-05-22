const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/api/posts", (req, res) => {
  res.send({
    employees: {
      Desi: { name: "desi", phone: "123" },
    },
  });
});
app.get("/api/posts", (req, res) => {
  res.send("hellllllooooooo");
});
app.listen(9000, () => {
  console.log(" You Have Been Served");
});
