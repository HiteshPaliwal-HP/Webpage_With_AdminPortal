const Contact = require("../models/contact-model");

const ContactForm = async(req,res)=>{
    try{
        const response = req.body;
        console.log(response);
        await Contact.create(response);
        return res.status(200).json({message:"message sent successfully"});
    }catch(err){
        console.log("Error from the contact router",err);
        const status = 422;
        const message = err;
        const error={
            status,
            message,
        };
        next(error);
        // return res.status(500).json({message:"Message not delivered"});
        
    }
}

module.exports = ContactForm;