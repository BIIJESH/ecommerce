const port = 4000;
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");
const { error, trace } = require("console");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const User = require("./models/User");
const db = require("./db.js");
const { request } = require("https");

//db connection

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
app.post("/addproduct", async (req, res) => {
  try {
    // Generate a unique ID (if needed)
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    // Create a new product instance
    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      available: true, // Set to default true
      date: Date.now(), // Set to current date
    });

    // Save the product to the database
    await product.save();
    console.log("Product saved successfully");

    // Send back a success response
    res.json({
      success: true,
      name: product.name,
    });
  } catch (error) {
    console.error("Error saving product:", error);

    // Send back an error response
    res.status(500).json({
      success: false,
      message: "Failed to save the product",
      error: error.message,
    });
  }
});
// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   } else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//   });
//   console.log("saved");
//   res.json({
//     // sucess: true,
//     name: req.body.name,
//   });
// });
//for removing product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed from db");
  res.json({
    sucess: true,
    name: req.body.name,
  });
});
//Creating api for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});
//creating a signup endpoint
app.post("/signup", async (req, res) => {
  // Email regex pattern for validation
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(req.body.email)) {
    return res.status(400).json({
      success: false,
      errors: "Invalid email format. Please provide a valid email.",
    });
  }

  // Password validation pattern
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordPattern.test(req.body.password)) {
    return res.status(400).json({
      success: false,
      errors:
        "Password must be at least 8 characters long, containing an uppercase letter, a lowercase letter, a number, and a special character.",
    });
  }

  // Check if passwords match
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      errors: "Passwords do not match.",
    });
  }

  // Check if user already exists
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "User with this email already exists.",
    });
  }

  // Create a new user if all checks pass
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  // Generate JWT token
  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//login endpoint
app.post("/login", async (req, res) => {
  // Find user by email
  let user = await User.findOne({ email: req.body.email });

  // Check if the user exists
  if (!user) {
    return res.status(400).json({
      success: false,
      errors: "User with this email does not exist.",
    });
  }

  // Compare entered password with the stored password
  const passCompare = req.body.password === user.password;

  // If password matches
  if (passCompare) {
    // Generate JWT token
    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    // Send success response with token
    return res.json({
      success: true,
      token,
    });
  } else {
    // If password does not match
    return res.status(400).json({
      success: false,
      errors: "Incorrect password.",
    });
  }
});
//Api creation
app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error" + error);
  }
});
//TODO: from 8:10:45
//TODO: fix the routes in different folder
