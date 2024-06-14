const {z} = require("zod");

const loginSchema = z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Please enter a valid email address"})
    .min(3,{message: "Email must be of atleast 3 characters"})
    .max(255,{message:"Email must not more than 255 characters"}),

    password:z
    .string({required_error:"Password number is required"})
    .min(7,{message: "Password must be of atleast 7 characters"})
    .max(1024,{message:"Password must not more than 1024 characters"}),
});

const signupSchema = loginSchema.extend({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be of 3 characters."})
    .max(255,{message:"Nam must not be more than 255 characters"}),

    // email:z
    // .string({required_error:"Email is required"})
    // .trim()
    // .email({message:"Please enter a valid email address"})
    // .min(3,{message: "Email must be of atleast 3 characters"})
    // .max(255,{message:"Email must not more than 255 characters"}),

    phone:z
    .string({required_error:"Phone number is required"})
    .trim()
    .min(10,{message: "Phonenumber must be of atleast 10 numbers"})
    .max(20,{message:"Phonenumber must not more than 20 numbers"}),

    // password:z
    // .string({required_error:"Password number is required"})
    // .min(7,{message: "Password must be of atleast 7 characters"})
    // .max(1024,{message:"Password must not more than 1024 characters"}),
});


module.exports = {signupSchema,loginSchema};