const{Schema,model,mongoose} = require("mongoose");

const serviceSchema = new Schema({
    services : {type:String,required:true},
    description:{type:String,require:true},
    price:{type:String,require:true},
    provider:{type:String,require:true},
});

const Service = new model("Service",serviceSchema);
module.exports = Service; 
