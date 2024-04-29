const express = require("express");
const bodyparser = require("body-parser");
const sequelize = require("./utils/database");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req, res, next) => {
  res.send("test");
});

app.use("/api/v1/clients", require("./routes/client-route"));

app.use((error, req, res, next) => {
  console.log("error " + error);
});

sequelize
  .sync()
  .then((res) => {
    console.log("db connected");
    app.listen(3001);
  })
  .catch((e) => console.log("bootstrap failed becase " + e));
