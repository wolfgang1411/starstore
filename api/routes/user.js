const express = require("express");
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../middlewares/authMiddleware")
const User = require("../models/User");
const { findByIdAndDelete } = require("../models/User");

const router = express.Router();

// create a new user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password must be greater than 6 digit").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: "User Already Exist" });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        id: user.id,
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ errors: "server error at user creation" });
    }
  }
);

//get all the users

router.get('/all', auth , async (req,res) => {

  try {
      const users = await User.find()
      return res.json(users)  
  } catch (err) {
    console.log(err)
    return res.status(401).json({errors:'server error at all users'})
  }
})

module.exports = router;

router.delete('/', auth , async (req,res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id)
    return res.send('User deleted')
    
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({errors:'server error on delete user'})
  }
})
