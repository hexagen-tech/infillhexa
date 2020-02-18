var express = require('express');
var router = express.Router();
var userdetails=require("../../model/user");
var productdetails=require("../../model/product");
var subproductdetails = require("../../model/subproduct")
var passport=require('passport');
var session = require('express-session');
//var bcrypt = require('bcryptjs');
router.get('/demo', function(req, res, next) {
  res.render('front/demo', { title: 'INFILLHEXA' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/index', { title: 'INFILLHEXA' });
});
router.get('/design_area/:_id', function(req, res, next) {
  var id=req.params._id;
  var edit=subproductdetails.findOne({_id:id });
  edit.exec(function(err,data){

  console.log(data);
  console.log(id);
  res.render('front/design_area', { title: 'INFILLHEXA' , user: data});
  });
});
router.get('/design_own', function(req, res, next) {
  productdetails.find({}, function(err, product) {
    res.render('front/design_own', { title: 'INFILHEXA ADMIN', details: product });
    });
});

router.get('/subproducts/:_id', function(req, res, next) {
  var productid=req.params._id;
   //console.log(productid);
  var edit=subproductdetails.find({productid:productid });
  edit.exec(function(err,data){
  //   if(err) throw err;
  //   else{
   // console.log (data);
    res.render('front/subproducts', { title: 'INFILLHEXA' ,details:data});
    
  });
 
});
router.get('/login', function(req, res, next) {
  res.render('front/login', { title: 'INFILLHEXA' });
});
//###################INSERT##################################
router.post('/signup', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.contact;
  var password = req.body.password;
 
// console.log(message)
var userifo = new userdetails({
  name:name,
  email:email,
  phone:phone,
  password:password
})
userifo.save((err, res)=>{
  if (err) throw err;
})
// email sending //

//console.log("successssssssss");
res.render('front/login', { title: '', });
});

//##################LOGIN######################
router.post('/login', function (req, res) {
  var post = req.body.password;
  var email = req.body.email;
    // console.log(password);
    // password = bcrypt.hashSync( password, 10)
    userdetails.findOne({
      email: email,
        
      }, function(err, user) {
        var uname = user.email;
        var passworddb = user.password;
         //console.log(passworddb);
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
          
        }
        if (email === uname && passworddb === post ) {
          // req.session.user_id = johns_user_id_here;
           res.redirect('/admin');
         } else {
           res.send('Bad user/pass');
         }
     
      });


 
});

//###############LOGOUT###################
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;