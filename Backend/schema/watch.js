const mongo=require('mongoose')
const {Schema}=mongo

const watchSchema = new Schema({
    category: { type: String },
    Items: [{ 
        newarr: { type: String },
        name: { type: String },
        size: { type: String },
        type: { type: String },
        body: { type: String },
        variation: { type: String },
        price: { type: String },
        imageurl: {type:String}
    }]
});

const watches=mongo.model(`Watches`, watchSchema)
module.exports=watches;