const port = 4000;
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { error, trace } = require("console");
const app = express();
const mongoose = require("mongoose");

//db connection
const mongoURL = "mongodb://localhost:27017/ecommerce";
const db = mongoose.connection;
mongoose.connect(mongoURL);

db.on("connected", () => {
  console.log("Connected to Database");
});

db.on("error", (err) => {
  console.log("Refused to connect to database" + err);
});

app.use(express.json()); //with this request that we will get from response that will be automatically passed through json
app.use(cors());

app.get("/", (req, res) => {
  res.send("Express app  is running ");
});

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.filename}_${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});
const upload = multer({ storage: storage });
//createing upload endpoint
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});
//Schema for creating product
const Prodcut = mongoose.model("Prodcut", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});
app.post("/addproduct", async (req, res) => {
  const product = new Prodcut({
    id: req.body.id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    sucess: true,
    name: req.body.name,
  });
});

//Api creation
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error" + error);
  }
});
