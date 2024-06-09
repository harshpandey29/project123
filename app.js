const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser")

const app = express();
const PORT = process.env.PORT;
const DB_MONGOOSE = process.env.DB_MONGOOSE;
//Database Connectivity
mongoose.connect(DB_MONGOOSE,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log("Data Base is Connected Successfully")
    
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

//Update-putrequest

app.put("/api/v1/product/:id",async(req,res)=>{

    let product1 = await product.findById(req.params.id);

    product1 = await product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        useFindAndModify:true,
        runValidator:true
    
    });

    const products = await product.find();


    res.status(200).json({
        sucess:true,
        products
    })
})

//delete
app.delete("/api/v1/product/:id",async(req,res)=>{

    const product2 = await product.findById(req.params.id);
    if(!product2){
        return res.status(500).json({
            sucess:false,
            message:"Not found"
        })
    }
    
    await product2.deleteOne();

     res.status(200).json({
        sucess:true,
        message:"deleted sucessfully"
    })

})


app.listen(PORT,()=>{
    console.log("Local Host Connected @ http://localhost:4500");
})