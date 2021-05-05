const express = require("express")
const expressValidator = require("express-validator")

const router = express.Router()

router.get('/',(req,res) => {
    return res.send('checkout worin')
})

module.exports = router