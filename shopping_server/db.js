const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping_cart',{useNewUrlParser:true,useUnifiedTopology: true },(err)=>{
    if(!err)
    {
        console.log("Connection succeed");
    }
    else{
        console.log("connection error:"+JSON.stringify(err,undefined,2));
    }
});
module.exports=mongoose;