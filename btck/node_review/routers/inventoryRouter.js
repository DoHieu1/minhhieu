const router = require("express").Router();
const { inventoryCollection } = require("../config/connectDB.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.get("/", authMiddleware, async (req, res) => {

    try {
        const { lowQty } = req.query
        const input = lowQty ? { instock: { $lt: +lowQty } } : {}

        const allInventory = await inventoryCollection.find(input).toArray();
        res.status(200).json({
            message: "Success",
            data: allInventory,
        })
    }

    catch (error) {
        res.status(400).json({
            message: "Error!!!",
            data: error.message,
        })
    }

})



module.exports = { inventoryRouter: router }
