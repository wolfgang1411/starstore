const mongoose = require("mongoose")
const config = require("config")


const db  = config.get('mongoURI')

const connectDB = async () => {

    try {
        await mongoose.connect(db, { useNewUrlParser: true ,  useUnifiedTopology: true })
        console.log('DB connected')
        
    } catch (err) {
        console.log(err.message)
        process.env.Exit
    }
}

module.exports = connectDB