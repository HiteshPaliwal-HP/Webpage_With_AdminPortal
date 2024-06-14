const mongoose = require("mongoose");
// const URL = "mongodb://127.0.0.1:27017/mern_admin";
const URL = process.env.MONGODB_URL;
// mongoose.connect(URL);

const connectDB = async()=>{
    try {
        await mongoose.connect(URL);
        console.log("databse connection succesfull"); 
    } catch (error) {
        console.error("database connection error");
        process.exit(0);
    }
}

module.exports=connectDB;