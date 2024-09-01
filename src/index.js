import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

// realizando conexão com o Banco de dados 
mongoose.connect(dbUrl)

  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

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
app.get('/product', async (req, res) => {

  const product = await Product.find()

  return res.status(200).send(product)
})


// Rota POST Product
app.post('/product', async (req, res) => {
  try {

    const { name, brand, category, price, quantity, image_url } = req.body

    if (!name || !brand || !category || !price || !quantity || !image_url) {
      return res.status(400).send("Incomplete data, check the request.")
    };

    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image_url: req.body.image_url
    })

    await product.save()
    return res.status(201).send("Product saved")

  } catch (error) {
    
    return res.status(400).send(error.message)
  }

});

// Rota DELETE Product
app.delete('/product/:id', async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)  // Buscando produto pelo ID

    if (!product) { //Tratando erro ID invalido
      return res.status(400).send("id not found")
    }

    await Product.findByIdAndDelete(req.params.id)
    return res.status(200).send("Deletado com sucesso!")

  } catch (error) {
    return res.status(400).send(error.message)
  }
})

// Rota PUT Product

app.put('/product/:id', async (req, res) => {
  try {

    const product = await Product.findByIdAndUpdate(req.params.id, {

      name: req.body.name,
      brand: req.body.brand,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      image_url: req.body.image_url

    }, { new: true })


    if (!product) { //Tratando erro ID invalido
      return res.status(400).send("id not found")

    }

    return  res.status(200).send(product)

  } catch (error) {

    return res.status(400).send(error.message)
  }

})

app.listen(port, () => {
  
  console.log('Server is running on port 3000')
})  