const mongoose=require('../db');
var Admins=mongoose.model('Admins',{
    adminId:{type:String},
    adminPassword:{type:String}
});
module.exports={Admins};