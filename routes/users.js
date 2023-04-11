const mongoose = require('mongoose');
const passport = require('passport');

mongoose.connect('mongodb://localhost/hihi').then(function () {
  console.log('connected to mongo')
})

var userSchema = mongoose.Schema({
  name: String,
  profession: String,
  dpimage: String,
  favourite:{
    type: Number,
    default: 0,
  },
  comments:{
    type:Array,
    default:[],
  },
  username: String,
  
})

module.exports = mongoose.model('user', userSchema);