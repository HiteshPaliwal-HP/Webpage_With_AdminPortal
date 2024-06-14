const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const userSchema = mongoose.Schema({
    username:{
        type:String,
        requir:true,
    },
    email:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
});


//secure the password with bcrypt
userSchema.pre("save",async function(next){
    const user=this;
    if(!user.isModified("password")){
        next();
    }

    try {
        const saltRound = await  bcrypt.genSalt(10);
        const hash_password = await  bcrypt.hash(user.password ,saltRound);
        user.password = hash_password ;
    } catch (error) {
        next(error);
    }
})

//compare password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password,this.password);
}

//JWT JASON WEB TOKEN

//used for authenticationa and authorization

//COMPONENTS OF JWT
//Header: Algorithme used to encrypt the token
//payload : contain data related to user .
//signature: Used to verify that the payload has not been tampered with in transit.

//define the model or collection name user=collection name and userSchema is the model

userSchema.methods.generateToken = async function() {
    try{
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT_KEY,    
        {
            expiresIn:"30d",
        }
        );
    }catch(err){
        console.error(error);
    }
}


const User = new mongoose.model("Users",userSchema);

module.exports = User;