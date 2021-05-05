const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("config")

const User = require("../models/User")
const auth = require("../middlewares/authMiddleware")

const router = express.Router();


//get user with token prefebly after login

router.get('/', auth ,async (req,res) => {
    try {
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(401).json({errors:"Invalid Token, Access Denied"})
        }

        return res.status(200).json({user})
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({errors:'Server Error'})
    }
})

// login with email and password
router.post(
  "/",
  [
    check("email", "Email is Required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
 async (req, res) => {
     const errors = validationResult(req)
     if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
     }

     try {

        const { email , password } = req.body

        let user = await User.findOne({email})

        if(!user) {
            return res.status(400).json({errors:'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch) {
            return res.status(400).json({errors:'Invalid Credentials'})
        }

        const payload = {
            id:user.id
        }
        jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err,token) => {
            if (err) throw err
            return res.json({token})
        })
        
         
     } catch (err) {
         console.log(err.message)
         return res.status(401).json({errors:'server Error'})
     }
 }
);

module.exports = router;
