const express = require('express');
const router = express.Router();
const Customer = require("../schema/customer.js")
const bcrypt = require('bcrypt');
const fetchUser=require("../middleware/login")

const jwt = require("jsonwebtoken")

const JWT_secretkey = "Himalaya";

router.post('/addCustomer', async (req, res) => {

    let user=await Customer.findOne({email:req.body.email});
    if(user){
        userexist=true;
        return res.status(400).json({userexist,errors:"try to login with correct credentials"});
    }
    else{
        const { title,
            firstName,
            lastName,
            password,
            email } = req.body;
    
        const salt = await bcrypt.genSalt(10);
        const secpassword = await bcrypt.hash(password, salt)
    
        const customer = new Customer({
            title,
            firstName,
            lastName,
            password: secpassword,
            email
        });
        const data = {
            customer: customer.id
        }
        const authtoken = jwt.sign(data, JWT_secretkey)
        res.json(authtoken)
        const savedcustomer = await customer.save();

    }

   
})
router.get('/fetchcustomer',fetchUser,async(req,res)=>{

    try{
        // console.log(req.user)
        const customer= await Customer.findOne({_id:req.user})
        // console.log(customer)
        res.json(customer)

    }
    catch(error){
        res.status(404).send('Internal Error Occured')
    }

})
router.post('/login', async (req, res) => {
    const { email,
        password
    } = req.body;

    try {
        let user = await Customer.findOne({ email: email })
        console.log(user)
        if (!user) {
            success = false;
            return res.status(400).json({ success, errors: "try to login with correct credentials" });
        }
        let inputpassword = await bcrypt.compare(password, user.password)
        if (!inputpassword) {
            success = false;
            return res.status(400).json({ success, errors: "try to login with correct credentials" });
        }
        const data = {
            user: user.id
        }
        const authtoken = jwt.sign(data, JWT_secretkey)
        success = true;
        res.json({ success, authtoken })
    }
    catch (error) {
        console.log(error)
        res.status(400).send("Internal error occured");
    }
})
module.exports = router;