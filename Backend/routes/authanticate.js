const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const secKey = '$ad#nbb23$nbn2@';

// saving data to db using post
router.post('/createuser', [
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'enter valid email').isEmail(),
  body('password', 'Password length should be at least 5').isLength({ min: 5 })
], async (req, res) => {
  const err = validationResult(req);
  let success=false;
  if (!err.isEmpty()) {
    return res.status(400).json({success, errors: err.array() });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    // console.log(user.id);
    // console.log("hello");
    const authToken = jwt.sign(user.id, secKey);
    success=true;
    return res.json({success, authToken});
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({success:false,error: 'Email already exists' });
    }
    console.error(error);
    return res.status(500).json({success:false,error: 'Server error' });
  }
})

// authanticate user login
router.post('/login', [
  body('email', 'enter valid email').isEmail(),
  body('password', 'password cannot be empty').exists()
], async (req, res) => {
  let success=false;
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({success, errors: err.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json(success,"Please enter valid credentials");
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json(success,"please enter valid credentials");
    }
    const authToken = jwt.sign(user.id, secKey);
    success=true;
    res.json({success, authToken });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Internal server error");
  }
})

// router 3: get user details using token. login required
router.post('/getuser',fetchuser, async (req, res) => {
  try {
    const user =req.user;
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router
