const mongoose=require('mongoose');
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("mongo db connection error",err);
});