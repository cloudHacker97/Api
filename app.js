//Global var
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const data = require('./Categories/cModel');
const productData = require('./Categories/pModel');
const port = process.env.PORT || 4000;


// connecting to mongo server
const url = 'mongodb+srv://admin:ahmed@cluster0.2pvyxhf.mongodb.net/main?retryWrites=true&w=majority';
mongoose.connect(url)
  .then(() => {
    console.log("success");
  }).catch(() => {
    console.log("error");
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//getting products from category id with query string

app.get('/products',(req,res)=>{
  const {query}=req;
  productData.find(query).then((found)=>{
      res.json(found);
  }).catch((error=>{
      console.log(error);
  }))

});

// posting category and getting it with id 
app.post('/categories', (req, res)=>{
  const newPost = new data (req.body);
  res.json(newPost);
  newPost.save();
}).get('/categories',(req,res)=>{
  data.find({}).then((found)=>{
    res.json(found);
  })
})
.get('/categories/:categoryId',(req,res)=>{
  data.findById(req.params.categoryId).then((found)=>{
    res.json(found);
  })
});
// posting products and getting it with id 

app.post('/products', (req, res)=>{
  const newProductPost = new productData (req.body);
  res.json(newProductPost);
  newProductPost.save();
}).get('/products',(req,res)=>{
  productData.find({}).then((found)=>{
    res.json(found);
  })
})
.get('/products/:productId',(req,res)=>{
  productData.findById(req.params.productId).then((found)=>{
    res.json(found);
  }).catch((error)=>{
    console.log("error");
  })
});


app.put('/products/:productId', (req,res)=>{
  productData.findById(req.params.productId).then((productData)=>{
    productData.name = req.body.name;
    productData.price = req.body.price;
    productData.quantity = req.body.quantity;
    productData.imageUrl = req.body.imageUrl;
    productData.categoryId=req.body.categoryId;
    res.json(productData);
    productData.save();

  }).catch((error)=>{
    console.log("error ")
  })
});
  









app.get('/', (req, res) => {
  res.send("hello");
  console.log("Hello User");

});

app.listen(port, () => {
  console.log(`app running at ${port}`);
});