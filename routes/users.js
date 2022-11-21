const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongoapp').then(function () {
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
  }
})

module.exports = mongoose.model('user', userSchema);