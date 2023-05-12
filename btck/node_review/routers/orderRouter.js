const router = require("express").Router();
const { orderCollection } = require("../config/connectDB.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const allOrder = await orderCollection.aggregate([
            {
                $lookup:
                {
                    from: 'inventory',
                    localField: 'item',
                    foreignField: 'sku',
                    as: 'description'
                }
            },
            {
                $unwind: '$description'
            },
            {
                $project:
                {
                    description: '$description.description',
                    _id: 1,
                    price: 1,
                    item: 1,
                    quantity: 1

                }

            }
        ]).toArray();

        res.status(200).json({
            message: "Success",
            data: allOrder,
        })
    } catch (error) {
        res.status(400).json({
            message: "Error!!!",
            data: error.message,
        })
    }
})

module.exports = { orderRouter: router }
