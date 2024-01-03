const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        requied: true,
    },
    email: {
        type: String,
        requied: true,
    },
    password: {
        type: String,
        requied: true,
    },
    profliePic: {
        type: String,
        requied: false
    },
},
    {
        timestamps: true
    })

module.exports=mongoose.model("users",userSchema);