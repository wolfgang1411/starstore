const mongoose = require("mongoose")

const ProductShema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

module.exports = Product = mongoose.model('Product',ProductShema) 