const express = require("express");
const app = express();
const { client } = require("./config/connectDB.js");
const { inventoryRouter } = require('./routers/inventoryRouter.js');
const { orderRouter } = require('./routers/orderRouter.js');
const { userRouter } = require("./routers/userRouter.js");
const { config } = require("dotenv");
config();

const PORT = process.env.PORT;

async function main() {
  try {
    await client.connect();
    console.log("Connected to mongodb successfully");

    app.use(express.json());

    app.use("/api/v1/user", authRouter);
    app.use("/api/v1/inventory", inventoryRouter)
    app.use("/api/v1/order", orderRouter)

    app.listen(PORT, () => {
      console.log(`App is running at ${PORT}`);
    });

  } catch (error) {

    console.log(error.message)
  }
}

main();
