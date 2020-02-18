var Url = 'mongodb://localhost:27017/demo';
const mongoose = require('mongoose');
mongoose.connect(Url, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true });
var conn =mongoose.Collection;
var userSchema =new mongoose.Schema({
        name: {type:String, 
            required: true,        
            },

        email: {
            type:String, 
            required: true,
            },
        phone: {
            type:Number,
            required: true,
        },
        password: {
            type:String,
            required: true,
        },
    
});

var userModel = mongoose.model('users', userSchema);
module.exports=userModel;
