// models/SeedPhrase.js
const mongoose = require('mongoose');

let SeedPhrase;

try {
  // Check if the model already exists
  SeedPhrase = mongoose.model('SeedPhrase');
} catch (error) {
  // If the model does not exist, create it
  SeedPhrase = mongoose.model('SeedPhrase', new mongoose.Schema({
    phrase: {
      type: String,
      required: true,
    },
  }));
}


module.exports = SeedPhrase;
