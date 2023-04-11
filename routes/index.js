var express = require('express');
var router = express.Router();
var userModel = require('./users')

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index');
});

router.get('/createuser', function (req, res) {
  userModel.create({
    name: req.query.name,
    profession: req.query.profession,
    dpimage: req.query.dpimage,
  }).then(function () {
    res.redirect("/userdetails")
  })
});

router.get('/userdetails', function (req, res) {
  userModel.find().then(function (users) {
    res.render("userdetails", { data: users })
  })
});


router.get('/edit/:id', function (req, res) {
  userModel.find({ _id: req.params.id })
    .then(function (oneuser) {
      res.render("edit", { data: oneuser });
    })
});


router.get('/update/:id', function (req, res) {
  userModel.findOneAndUpdate({ _id: req.params.id }, {
    name: req.query.name,
    profession: req.query.profession,
    dpimage: req.query.dpimage,
  })
    .then(function (users) {
      res.redirect("/userdetails");
    })
});

router.get('/delete/:id', function (req, res) {
  userModel.findByIdAndDelete({ _id: req.params.id })
    .then(function (users) {
      res.redirect("/userdetails")
    })
});


router.get('/favourite/:id', function (req, res) {
  userModel.findByIdAndUpdate({ _id: req.params.id })
    .then(function (data) {
      data.favourite++;
      data.save()
        .then(function () {
          res.redirect("/userdetails")
        })
    })
});


router.get('/comment/:id', function (req, res) {
  userModel.findByIdAndUpdate({ _id: req.params.id })
    .then(function (cmnt) {
      var date = new Date();
      cmnt.comments.push({comment:req.query.comment , date :`${date.getMonth()+1}/${date.getFullYear()}  ${date.getHours()}:${date.getMinutes()} ` })
      cmnt.save().then(function () {

        res.redirect("/userdetails")

      })
    })
});



module.exports = router;
