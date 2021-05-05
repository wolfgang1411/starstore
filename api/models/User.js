const mongoose = require("mongoose")


const userShema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    avatar:{
        type:String
    },
    cart:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number
            }
        }
    ],
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = User = mongoose.model("user",userShema) 