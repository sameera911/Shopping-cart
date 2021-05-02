const mongoose=require('../db');
var Reviews=mongoose.model('Reviews',{
    isbnNo:{type:Number},
    review:{type:String}
});
module.exports={Reviews};