const mongoose = require('mongoose');
const express = require('express');
const app = express();
//middleware
app.use(express.json());


//connect with mongoDB database
mongoose.connect('mongodb://localhost/world',
{useNewUrlParser: true, useUnifiedTopology: true},
() => {
  console.log("Connected to database world...")
});


//create mongoose schema
const schema = mongoose.Schema({
  id: Number,
  name: String,
  countryCode: String,
  district: String,
  population: Number
});

//create the mongoose model
const City = mongoose.model("city", schema, "city");


//post data to the world db
app.post('/', async (req,res)=> {
  const post = new City({
    id: req.body.id,
    name: req.body.name,
    countryCode: req.body.countryCode,
    district: req.body.district,
    population: req.body.population
  });  

  const savePost = await post.save();
  res.json(savePost);
});


//update data to the world db
app.put('/:id', async (req,res)=> {
  const updatePost = await City.updateOne({ id: req.params.id }, {
    $set: {
      population: req.body.population
    }
  });  

  res.json(updatePost);
});


//read data from world db
app.get('/:id', async (req,res)=> {
  const findCity = await City.findOne({ id: req.params.id });
  res.json(findCity);
});


//delete data from world db
app.delete('/:id', async (req,res)=> {
  const removeCity = await City.findOneAndRemove({ id: req.params.id });
  res.json(removeCity);
});


//listen to a port
app.listen(3000, () => console.log("Server running on port 3000..."));