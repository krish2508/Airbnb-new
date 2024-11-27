const mongoose=require("mongoose");
const initdata=require("./data.js");
const Listing= require("../models/listing.js");
const mongo_url=process.env.MONGO_CONN;
mongoose.connect(mongo_url).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("mongo db connection error",err);
});
const initDB=async()=>{
    await Listing.insertMany(initdata.data);
    console.log("all data filled");
}
initDB();
console.log('MONGO_CONN:', process.env.MONGO_CONN);
