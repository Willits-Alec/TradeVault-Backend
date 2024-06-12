// models/Sale.js
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  itemName: String, // Name of the item
  quantity: Number, // Quantity of the item
  costPerItem: Number, // Cost per item
  sold: Number, // Amount sold
  investment: Number, // Total investment
  soldFor: Number, // Amount sold for
  taxPaid: Number, // Tax paid
  profit: Number, // Profit
  date: String // Date entered
});


module.exports = mongoose.model('Sale', saleSchema);