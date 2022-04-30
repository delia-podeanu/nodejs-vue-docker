module.exports = (app) => {
  const counters = require("../controllers/counter.controller.js");
  var router = require("express").Router();

  router.get("/", counters.findOne);
  router.post("/create", counters.create);
  router.put("/:id", counters.update);
  app.use("/api/counter/", router);
};
