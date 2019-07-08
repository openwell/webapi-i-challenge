const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post End Point....Creation of User
server.post("/api/users", (req, res) => {
  db.insert(req.body)
    .then(data => {
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res.send(err);
    });
});
// GET  ENd Point .... Fetching of All Users
server.get("/api/users", (req, res) => {
    db.find()
      .then(data => {
        res.status(200).json({
          data: data
        });
      })
      .catch(err => {
        res.send(err);
      });
  });

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
