const User = require("../models/user-models");
const Contact = require("../models/contact-model");
const bcrypt = require("bcryptjs");
const home = async(req,res)=>{
    try{
        res.status(200).send("welcome to home page using router");
    }catch(error){
        console.log(error);
    }
}

//*---------------------------------------------------------------------------
//Registration logic
//*---------------------------------------------------------------------------

//1. Get Registration data : Regtive the user data (username,email,password,etc..)
//2. Check email Existence : check  if the email is already registered or not
//3. Hash the Pasword
//4. Create user : create new user with hashed passwor 
//5. save to Db: save user to the db
//6. Respond : Respond with "Registraion successfull" or handle the error
const register  = async(req,res)=>{
    try{
        console.log(req.body);
        const {username,email,phone,password} = req.body;

        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(400).json({message:"User Already Exist"});
        }
        //Hashing the password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password,saltRound);
        //Create a new user in the database 
        const userCreated = await User.create({
            username,
            email,
            phone,
            password,
        });

        res.status(201).json({
            msg : "registration successfull", 
            token: await userCreated.generateToken(),
            userId:userCreated.id.toString(),
        });
    }catch(err){
        // res.status(400).json({msg:"page not found"})
        // console.log(err);
        next(err);
    }
}

//*---------------------------------------------------------------------------
// USER LOGIN FUNCTION 
//*----------------------------------------------------------------------------

const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        const userExist = await User.findOne({email});
        // console.log(userExist);

        if(!userExist){
            return res.status(200).json({message : "Invalid credentials"});
        }
        // console.log(userExist.password);

        // const user = await bcrypt.compare(password,userExist.password); this also can be used

        const user = await userExist.comparePassword(password);
        
        // console.log(user);
        
        if(user){
            res.status(200).json({
                msg:"Login Successfull",
                token:await userExist.generateToken(),
                userId:userExist._id.toString(),

            });
        }else{
            res.status(401).json({message:"Invalid email or  Password"});
        }
    }catch(err){
        // res.status(500).json({msg:'Server Error'})
        next(err);
    }
}


//*-------------------------------------------
//* TO SEND USER DATA - USER LOGIC AFTER LOGIN
//*-------------------------------------------
const user = async (req,res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from the user router ${error}`);
    }
};
module.exports = {home,register,login,user};