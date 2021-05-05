const mongoose = require("mongoose")

const DirectorySchema = mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    imageUrl: {
        type:String,
        require:true
    },
    linkUrl: {
        type:String,
        require:true
    }
})

module.exports = Directory = mongoose.model('Directory',DirectorySchema)