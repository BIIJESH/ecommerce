const mongoose = require("mongoose");
const mongoURL = "mongodb://localhost:27017/ecommerce";
const db = mongoose.connection;
mongoose.connect(mongoURL);

db.on("connected", () => {
  console.log("Connected to Database");
});

db.on("error", (err) => {
  console.log("Refused to connect to database" + err);
});
