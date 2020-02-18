var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
var mongoose = require('mongoose');
var userdetails=require("../../model/user");
var userdetails1=require("../../model/product");
var subproduct = require("../../model/subproduct");
router.use(express.static(__dirname+"./public/"));
var Storage= multer.diskStorage({
  destination:"./public/productupload/",
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
  }
});
var upload = multer({
  storage:Storage
}).single('file');

router.post('/productform',upload,function(req, res, next) {
  var pname = req.body.pname;
  var pid = req.body.pid;
  var price = req.body.price;
  var category = req.body.category;
  var imageFile=req.file.filename;
  //var image = req.body.image;
 
// console.log(message)
var userinfo1 = new userdetails1({
  productname:pname,
  productid:pid,
  price:price,
  category:category,
  image:imageFile
  //image:image
})
userinfo1.save((err, res)=>{
  if (err) throw err;
})

res.render('admin/productform', { title: '',  result : userinfo1 } );
});


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'INFILHEXA ADMIN' });
});

router.get('/login', function(req, res, next) {
  res.render('admin/login', { title: 'INFILHEXA ADMIN' });
 });
 router.get('/resetpass', function(req, res, next) {
   res.render('admin/resetpass', { title: 'INFILHEXA ADMIN' });
 });
 router.get('/signup', function(req, res, next) {
   res.render('admin/signup', { title: 'INFILHEXA ADMIN' });
 });
 router.get('/admin', function(req, res, next) {
   res.render('admin/admin', { title: 'INFILHEXA ADMIN' });
 });
 //###############FETCH_TABLE#######################
 router.get('/register', function(req, res, next) {
  userdetails.find({}, function(err, users) {
  res.render('admin/register', { title: 'INFILHEXA ADMIN', details: users });
  });
  });
 
 router.get('/productform', function(req, res, next) {
   var user = 1;
   res.render('admin/productform', { title: 'INFILHEXA ADMIN' ,  result : user});
 });
 router.get('/producttable', function(req, res, next) {
  userdetails1.find({}, function(err, users) {
    console.log(users)
 res.render('admin/producttable', { title: 'INFILHEXA ADMIN', result: users });
});
 });
 router.get('/salestable', function(req, res, next) {
   res.render('admin/salestable', { title: 'ExprINFILHEXA ADMINess' });
 });
 
 router.get('/paymenttable', function(req, res, next) {
   res.render('admin/paymenttable', { title: 'INFILHEXA ADMIN' });
 });
 router.get('/address', function(req, res, next) {
   res.render('admin/address', { title: 'INFILHEXA ADMIN' });
 });
 router.get('/statement', function(req, res, next) {
   res.render('admin/statement', { title: 'INFILHEXA ADMIN' });

 });
 router.get('/logined', function(req, res, next) {
  res.render('admin/loginedit', { title: 'INFILLHEXA' });
});
//###############DELETE####################################
 router.get('/delete/:_id', function(req, res) { 
 mongoose.model("users").remove({_id:req.params._id},function(err,deldata){
 res.redirect("/admin/register");
//res.render('admin/register');
   });
});
//####################UPDATE FETCH######################
router.get('/edit/:_id', function(req, res,next){
  var id=req.params._id;
  var edit=userdetails.findByIdAndUpdate(id);
  edit.exec(function(err,data){
  //   if(err) throw err;
  //   else{
  res.render("admin/loginedit",{title:'employee record',records:data});
    
  });
  });

 //##########################UPDATE#######################
 router.post('/update/:_id', function(req, res,next){  
 var update = userdetails.findByIdAndUpdate(req.params._id,{
   name : req.body.name,
   email : req.body.email,
   phone : req.body.contact,

 });
 update.exec(function(err,data){
   //console.log(data);
    if(err) throw err;
    else{
  res.redirect("/admin/register");
 
  }});
  });
  router.get('/delete_product/:_id', function(req, res) { 
    mongoose.model("products").remove({_id:req.params._id},function(err,deldata){
    res.redirect("/admin/producttable");
   //res.render('admin/register');
      });
   });
   router.get('/edit_product/:_id', function(req, res,next){
    var proid=req.params._id;
    var edit_pro=userdetails1.findByIdAndUpdate(proid);
    edit_pro.exec(function(err,data){
     res.render('admin/productform', { title: '',  result : data } );
    });
    });


    router.post('/product_update/:_id', function(req,upload,res,next){  
      var pro_update = userdetails1.findByIdAndUpdate(req.params._id,{
      
         pname : req.body.pname,
         pid : req.body.pid,
         price : req.body.price,
         category : req.body.category,
        imageFile:req.file.filename,
     
      });
      pro_update.exec(function(err,data){
        //console.log(data);
         if(err) throw err;
         else{
       res.redirect("/admin/producttable");
      
       }});
       });

       router.get('/subproduct', function(req, res, next) {
        userdetails1.find({}, function(err, users) {
          //console.log(users)
          res.render('admin/subproduct', { title: 'INFILHEXA ADMIN' ,  result : users});
          });
        
      });

      router.post('/subproduct',upload,function(req, res, next) {

        var pname = req.body.spname;
        var pids = req.body.spid;
        var price = req.body.sprice;
        var productid  = req.body.Product;
        var imageFile=req.file.filename;
       
       console.log("__________________________hyeeeeeeeeeeeeeeeeeeeeeee___________________________________");
      //  console.log(pids);
      // console.log(message)
      var sub_product = new subproduct({
        productname:pname,

        productid:productid,
        sub_productid:pids,
        price:price,
        image:imageFile,
        //image:image
      })
      sub_product.save((err, res)=>{
        if (err) throw err;
        
      })
     
      userdetails1.find({}, function(err, users) {
        //console.log(users)
        res.render('admin/subproduct', { title: 'INFILHEXA ADMIN' ,  result : users});
        });
     
        
      });
module.exports = router;
