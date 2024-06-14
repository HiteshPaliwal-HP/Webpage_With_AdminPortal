const User = require("../models/user-models");
const Contact = require("../models/contact-model");

// *------------------------------------------
//* Getting all user details
// *------------------------------------------
const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find({},{password:0});
        // console.log(users);
        if(!users || users.length ===0){
            return res.status(404).json({message : "No Users Found"});
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};
// *------------------------------------------
//* Getting all  contatcs
// *------------------------------------------
const getAllContacts = async(req,res)=>{

    try {
        const contacts = await Contact.find();
        // console.log(contacts);
        if(!contacts || contacts.length ===0){
            return res.status(404).json({message : "No MessageFound"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};
// *------------------------------------------
//* Deleting the users from database
// *------------------------------------------
const deleteUserById = async (req,res)=>{
    try {
        const id=req.params.id;
        await User.deleteOne({ _id:id });
        return res.status(200).json({message:"User Deleted Sucessfully"});
        
    } catch (error) {
        next(error);
    }
}
// *------------------------------------------
//* Deleting the Contacts from database
// *------------------------------------------
const deleteContactById = async (req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({ _id:id });
        return res.status(200).json({message:"Contact Deleted Sucessfully"});
        
    } catch (error) {
       console.log(error);
    }
}
// *------------------------------------------
//* Updating the  users from database
// *------------------------------------------
const getUserById = async (req,res)=>{
    try {
        const id=req.params.id;
        const data  = await User.findOne({ _id:id },{password:0});
        return res.status(200).json(data);
        
    } catch (error) {
        next(error);
    }
}

const updateUserById = async (req,res)=>{
    try {
        const id = req.params.id;
        const updateUserData = req.body;
        const updatedData = await User.updateOne(
            {_id:id},
            {
                $set:updateUserData,
            }
        );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}
module.exports = {getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById};