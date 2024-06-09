const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();

mongoose.connect("mongodb://localhost:27017/Sample",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
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

app.post("/api/v1/product/new",async(req,res)=>{
    const Product = await product.create(req.body);
    res.status(200).json({
        sucess:true,
        Product
    })

})


app.listen(4500,()=>{
    console.log("vicky is chutiya boy http://localhost:4500");
})