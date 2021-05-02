const mongoose=require('../db')
var Books=mongoose.model('Books',{
    isbnNo:{type:String},
    bookName:{type:String},
    category:{type:String},
    dop:{type:Date},
    bookImage:{type:String},
    description:{type:String},
    author:{type:String},
    price:{type:Number},
    });
module.exports={Books};