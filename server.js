require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saleRoutes = require('./routes/saleRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use(cors({
  origin: 'https://tradevault-frontend.onrender.com',
  optionsSuccessStatus: 200
}));

// Check if MONGO_URI is loaded
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/sales', saleRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to TradeVault Backend');
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/trade-vault-frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/trade-vault-frontend/index.html'));
});
