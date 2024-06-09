const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();

mongoose.connect("mongodb+srv://admin123:admin123@cluster0.ryswnrs.mongodb.net/",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("db connected")
    
}).catch((err)=>{
    console.log(err)
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())


const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    price:Number,
})

const product = new mongoose.model("product",productSchema)

//create-postrequest
app.post("/api/v1/product/new",async(req,res)=>{
    const Product = await product.create(req.body);
    res.status(200).json({
        sucess:true,
        Product
    })

})
//Read-getrequest

app.get("/api/v1/products",async(req,res)=>{
    const products = await product.find();
    res.status(200).json({
        sucess:true,
        products
    })
})

app.listen(4500,()=>{
    console.log("vicky is a good boy  http://localhost:4500");
})