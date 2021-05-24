const mongoose = require('mongoose')
const book_data = new mongoose.Schema({
    book_name:{
        type:String,
        required:true
    },
    book_author_name:{
        type:String,
        required:true
    },
    number_of_pages:{
        type:Number,
        required:true
    }
});

const book = mongoose.model("book_data", book_data)
module.exports = book;