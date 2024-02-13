const express = require('express');
const router = express.Router();
// const novelity=require("../schema/novelity_watches.js")//** */
const Watch = require("../schema/watch.js")

router.post('/addWatch', async (req, res) => {
    const { newarr, name, size, type, body, variation, price, imageurl, category } = req.body;

    try {
        const watchCategory = await Watch.findOne({ category: "Novelity" });

        if (!watchCategory) {
            const watch = new Watch({
                category: category,
                Items: [{
                    newarr,
                    name,
                    size,
                    type,
                    body,
                    variation,
                    price,
                    imageurl
                }]
            });

            await watch.save();
        } else {
            watchCategory.Items.push({
                newarr,
                name,
                size,
                type,
                body,
                variation,
                price,
                imageurl
            });

            await watchCategory.save();
        }

        res.status(200).json({ success: true, message: 'Item added to cart successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


router.get('/getwatch', async (req, res) => {
    try {
        const novelity = await Watch.findOne({ category: "Novelity" });
        res.json(novelity.Items)

    }
    catch (error) {
        console.log(error)
        res.status(400).send("Internal error occured");
    }
})

module.exports = router;