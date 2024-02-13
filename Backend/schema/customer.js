const mongo=require('mongoose')
const {Schema}=mongo

const customerSchema = new Schema({
    title:{type:String, required: true },
    firstName:{type:String, required: true },
    lastName:{type:String, required: true },
    password:{type:String, required: true },
    email:{type:String, required: true }
});


const customer=mongo.model(`Customer`,customerSchema)
module.exports=customer;