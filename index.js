const express= require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const book_model = require("./models/book_data");
const { $where } = require('./models/book_data');
require('dotenv').config;
// const path = require('path');

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://mohan:password12345@books.wblyy.mongodb.net/book?retryWrites=true&w=majority", {useNewUrlParser : true});


app.post("/insert", async(req,res)=>{
    const book_name = req.body.book_name;
    const book_author_name = req.body.book_author_name;
    const pages = req.body.pages;
    const book = new book_model({book_name:book_name,book_author_name:book_author_name,number_of_pages:pages});
    try {
        await book.save();
        res.send("inserted")
    } catch (err) {
        console.log(err);
    }

});

app.get("/read", async(req,res)=>{
    book_model.find({}, (err,result)=>{
    if(err){
        res.send(err);
    }
    else {
        res.send(result);
    }
    });
});

app.put("/update",async(req,res) =>{
    const newbook_name = req.body.newbook_name;
    const newbook_author_name = req.body.newbook_author_name;
    const newpages = req.body.newpages;
    const id = req.body.id;
    try{
        await book_model.findById(id, (err, updatedbook) => {
            updatedbook.book_name = newbook_name;
            updatedbook.book_author_name = newbook_author_name;
            updatedbook.number_of_pages = newpages;
            updatedbook.save();
            res.send("updated");
        });
        
    }
    catch(err){
        console.log(err);
    }
    
});


app.delete("/delete/:id", async(req,res)=>{
    const id = req.params.id;
    await book_model.findByIdAndDelete(id).exec();
    res.send("deleted");
});

// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('../client/build'));

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname,'client','build', 'index.html'));
//     })
// }

// const port = process.env.PORT || 3001;
app.listen(process.env.PORT || 3001, ()=>{
    console.log("Server is running...");
});