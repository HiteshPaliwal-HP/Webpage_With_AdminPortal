const Service = require("../models/service-model");
const services = async(req,res)=>{
    try {
        // console.log("Message from out");
       const response = await Service.find(); 
       if(!response){
        res.status(404).json({msg:"No Service found"});
        return;
       }
    //    console.log("Message from out",response);
       res.status(200).json({msg:response});
    } catch (error) {
        console.log(`Services ${error}`);
    }
}

module.exports = services;