const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../models/user.model");



const userRouter = express.Router();
const key  = process.env.key

userRouter.get("/", async (req, res) => {
  try {
    let data = await userModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ err: err.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password } = req.body;
  console.log(name, email, gender, password);
  try {
    const oldUser = await userModel.find({ email });
    if (oldUser.length > 0) {
      res.send("user already exist");
    } else {
      const encryptedPass = await bcrypt.hash(password, 10);
      let user = new userModel({
        email,
        name,
        password: encryptedPass,
        gender,
      });
      await user.save();
      res.send("user added successfully");
    }
  } catch (err) {
    console.log(err);
    res.send({ err: err.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.find({ email });

    if (user.length > 0 && (bcrypt.compare(password, user[0].password))) {
      let token =  jwt.sign({"userID": user[0]._id }, key,{expiresIn:"1h"});
      res.send({ "user": email, "token": token });
    }else{
      res.send("enter valid credentials");
    }
  } catch (err) {
    console.log(err);
    res.send({ err: err.message });
  }
});

module.exports = { userRouter };
