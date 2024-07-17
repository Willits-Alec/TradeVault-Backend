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

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}));

// Check if MONGO_URI is loaded
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI not defined in environment variables');
  process.exit(1);
}

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

// Routes
app.use('/sales', saleRoutes);

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/trade-vault-frontend')));

// Angular app wildcard route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/trade-vault-frontend/index.html'));
});

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TradeVault Backend');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
