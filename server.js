const express = require("express")
const cors = require('cors')
const connectDB = require("./config/db")

const app = express()

connectDB()

app.use(cors())

app.use(express.json({extended:false}))

app.use('/api/user',require('./api/routes/user'))
app.use('/api/auth',require("./api/routes/auth"))
app.use('/api/product',require("./api/routes/products"))
app.use('/api/checkout',require("./api/routes/checkout"))
app.use('/api/cart',require('./api/routes/cart'))


const PORT = process.env.PORT || 5000

app.listen(PORT,() => {
    console.log(`app is working on ${PORT}`)
})

