const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const db = require("./app/models");

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();
require("./app/routes/counter.routes")(app);
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const io = require("./socket").init(server);
io.on("connection", (socket) => {
  console.log("Client connected");
});
