const db = require("../models");
const io = require("../../socket");

const Counter = db.Counter;

exports.create = (req, res) => {
  if (!req.body.value) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  const counter = {
    value: req.body.value,
  };

  Counter.create(counter)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the counter.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Counter.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        io.getIO().emit("counter", {
          action: "create",
          counter: { ...req.body },
        });
        res.send({
          message: "Counter was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update counter.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating counter, " + err,
      });
    });
};

exports.findOne = (req, res) => {
  Counter.findAll()
    .then((data) => {
      if (data) {
        res.send({ counter: data[0] });
      } else {
        res.status(404).send({
          error: `Cannot find any counter.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving counter",
      });
    });
};
