import express from "express";
import mongoose from "mongoose";
import { password } from './config.js';



const app = express()
app.use(express.json())
const port = 3000;


// Configurando modelo de dados
const Product = mongoose.model('Product', { 
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    image_url: String
});

// Rota GET Product
app.get('/', async (req, res) => {

  const product = await Product.find()
  res.status(200).send(product)
})


// Rota POST Product
app.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
        image_url: req.body.image_url
    })
    await product.save()
    res.status(201).send('Product added successfully')
});


app.listen(port, () => {

  mongoose.connect(password) // realizando conexão com o Banco de dados 
  console.log('Server is running on port 3000')
})  