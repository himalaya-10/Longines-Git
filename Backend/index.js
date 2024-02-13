var express= require('express')
const cors= require('cors')
const mongoconnect=require("./db")
mongoconnect()

const app=express()
app.use(cors())
const port = 8000
app.use(express.json())
app.use("/api",require("./routes/addwatch.js"))
app.use("/api",require("./routes/addcart.js"))
app.use("/api",require("./routes/createcustomer.js"))
app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})