const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mern-example')
  .then(() => console.log('Mongo connected successfully'))
  .catch(err => console.error('Mongo connection error:', err));

const Item = mongoose.model('Item', new mongoose.Schema({
  name: { type: String, required: true },
}));

app.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); 
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.post('/items', async (req, res) => {
  try {
    const newItem = new Item({ name: req.body.name });
    const savedItem = await newItem.save(); 
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

app.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id); 
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
