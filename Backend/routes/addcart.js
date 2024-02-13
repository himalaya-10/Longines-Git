const express = require('express');
const router = express.Router();
const fetchUser=require("../middleware/login")
const Cart=require("../schema/cart.js")

router.get('/getcart',fetchUser,async(req,res)=>{
    try{
            const userCart = await Cart.findOne({user:req.user});
            res.json(userCart)
            
            
        }
        catch(error){
            console.log(error)
            res.status(400).send("Internal error occured");
        }
})

router.post('/addcart',fetchUser ,async (req, res) => {
    try {
        const {name, price, image } = req.body;

        const userCart = await Cart.findOne({user:req.user});

        if (!userCart) {
            const newCart = new Cart({
                user:req.user, // Replace 'userId' with the actual user identification field
                Items: [{
                    name,
                    price,
                    image
                }]
            });

            await newCart.save();
        } else {
            // If the user has a cart, add the item to the existing cart
            userCart.Items.push({
                name,
                price,
                image
            });

            await userCart.save();
        }

        res.status(200).json({ success: true, message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});
router.delete("/deletecartItems/:id",fetchUser,async(req,res)=>{
    try{
    userid=req.user;
    const itemId = req.params.id;
    const userCart = await Cart.findOne({user:userid});
    let dcart= await userCart.Items.filter((cart) => {
        return cart._id.toString() !== itemId;
    })
    console.log(dcart)
    userCart.Items=dcart
    await userCart.save();
    res.json({"Success": "Item has been deleted..."})
}
catch(error){
    console.log(error)
    res.status(400).send("Internal error occured");
}
})

module.exports = router;
