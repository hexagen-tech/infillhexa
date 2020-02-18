var Url = 'mongodb://localhost:27017/demo';
const mongoose = require('mongoose');
mongoose.connect(Url, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });
var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
        productname: {type:String, 
            required: true,        
            },
        productid: {
            type:String, 
            required: true,
            },
        sub_productid: {
            type:String, 
            required: true,
            },
        price: {
            type:String,
            required: true,
        },
         image: {
            type:String,
            required: true,
        },
    
});

var userModel = mongoose.model('subproducts', userSchema, 'subproduct');
module.exports=userModel;
