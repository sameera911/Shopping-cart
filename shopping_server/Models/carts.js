const mongoose=require('../db')
var Cart=mongoose.model('Cart',{
    userName:{type:String},
    password:{type:String},
    phoneNo:{type:Number},
    isbnNo:{type:Number},
    bookName:{type:String},
    price:{type:Number},
    numberofBooks:{type:Number},
    date:{type:Date}
});
module.exports={Cart};