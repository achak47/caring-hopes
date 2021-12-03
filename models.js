const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name : String,
    number: String,
    email : String,
    desc : String,
    password : String
  });
const schema1 = new mongoose.Schema({
    name : String,
    number: String,
    email : String,
    password : String
  });

  module.exports = {
    doctor:  mongoose.model('doctors',schema) ,
    public: mongoose.model('public',schema1)
  }