const express = require("express");
const db = require("./data/db");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// Post End Point....Creation of User
server.post("/api/users", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.insert(req.body)
    .then(data => {
      res.status(201).json({
        data: data
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
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
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET  ENd Point .... Fetching a User by Id
server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      }
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// DELETE  ENd Point .... Deleting a User by Id
server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

// PUT  ENd Point .... Editing of a User by Id
server.put("/api/users/:id", (req, res) => {
  if (!req.body.name || !req.body.bio) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }
  db.update(req.params.id, req.body)
    .then(data => {
      if (!data) {
        return res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
      res.status(200).json({
        data: data
      });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n");
});
