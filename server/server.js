require("dotenv").config(); // importing to say application that we are using env files
const express=require('express');
const cors = require('cors');
const errorMiddleware = require("./middlewares/error-middleware");
const app = express();
const authRoute = require('./router/auth-router'); 
const contactRoute =  require('./router/contact-router'); 
const serviceRoute =  require('./router/service-router');
const adminRoute = require('./router/admin-router');
const connectDb=require("./utils/db");
// let's tackle cors 
const corsOptions={
        origin:"http://localhost:5173",
        methods:"GET, POST, PUT, DELETE, PATCH, HEAD",
        credentials:true,
};
app.use(cors(corsOptions));
app.use(express.json()); //to recive the data in  json format
app.use('/api/auth',authRoute);
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);
app.use('/api/admin',adminRoute);
app.use(errorMiddleware); //add at the end and before the server 
const PORT = 5000;


connectDb().then(()=>{
        app.listen(PORT,()=>{
                console.log(`server is running on port: ${PORT}`);
        });
});