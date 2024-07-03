
const mongoose = require('mongoose');

const contentSchema = mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    }

},{timestamps:true})


const Content = mongoose.model('Content', contentSchema);

module.exports = Content; 