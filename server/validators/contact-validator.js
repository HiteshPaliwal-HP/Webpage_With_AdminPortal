const {z} = require("zod");


const contactSchema = z.object({
    username:z
    .string({required_error:"Username is required"})
    .trim()
    .min(3,{message:"Username must be of 3 characters."})
    .max(255,{message:"Nam must not be more than 255 characters"}),

    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Please enter a valid email address"})
    .min(3,{message: "Email must be of atleast 3 characters"})
    .max(255,{message:"Email must not more than 255 characters"}),

    message:z
    .string({required_error:"Email is required"})
    .trim()
    .min(20,{message:"Message must be of 20 characters."})
    .max(255,{message:"Message must not be more than 255 characters"}),
});
module.exports = {contactSchema};