const mongoose = require("mongoose");

const prdSchema = new mongoose.Schema({
    
    prdid:{
        type:String,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
},{timestamps :true});

const prdModel = mongoose.model("prdModel", prdSchema);

module.exports = prdModel;