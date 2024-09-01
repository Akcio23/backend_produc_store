import express from "express";
import mongoose from "mongoose";
import { password } from './config.js';



const app = express()
app.use(express.json())
const port = 3000;


// Configurando modelo de dados
const Product = mongoose.model('Product', { 
    name: String,
    brand: String,
    category: String,
    price: Number,
    quantity: Number,
    image_url: String
});

// Rota GET Product
app.get('/', async (req, res) => {

    await Product.find()

    return  res.status(200)
})


// Rota POST Product
app.post('/', async (req, res) => {
  const{name,brand,category,price,quantity,image_url} = req.body

  if(!name || !brand || !category || !price || !quantity || !image_url){
    return res.status(400).send("Incomplete data, check the request.");
  }

    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        image_url: req.body.image_url
    })

    await product.save()
    res.status(201).send("Product saved")
});

// Rota DELETE Product
app.delete('/:id', async(req ,res)=>{
   await Product.findByIdAndDelete(req.params.id)
  res.status(200).send("Deletado com sucesso!")
})

// Rota PUT Product

app.put('/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image_url: req.body.image_url
  },{new:true})
    res.status(200).send(product)
})

app.listen(port, () => {

  mongoose.connect(password) // realizando conexão com o Banco de dados 
  console.log('Server is running on port 3000')
})  