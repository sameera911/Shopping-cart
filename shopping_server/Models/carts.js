const mongoose=require('../db')
var Carts=mongoose.model('Carts',{
    userName:{type:String},
    isbnNo:{type:String},
    noOfCopies:{type:Number},
    amount:{type:Number},
    date:{type:Date}
});
module.exports={Carts};