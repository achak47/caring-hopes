const mongoose = require('mongoose')
const uniqueValidator = require ('mongoose-unique-validator');

const schema = new mongoose.Schema({
    name : String,
    number: String,
    email : {type : String, unique : true},
    desc : String,
    password : String
  });
const schema1 = new mongoose.Schema({
    name : String,
    number: String,
    email : {type : String, unique : true},
    password : String
  });
schema.plugin (uniqueValidator);
schema1.plugin (uniqueValidator);

  module.exports = {
    doctor:  mongoose.model('doctors',schema) ,
    public: mongoose.model('public',schema1)
  }