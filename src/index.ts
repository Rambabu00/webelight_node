import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import swaggerUi from 'swagger-ui-express';
 import specs from "./Swagger.ts";
const app= express();
// calling db.ts file
import "./config/Db.ts";
import userRouter from "./routes/userRoute.ts";
import customerRouter from "./routes/CustomerRoute.ts";
import productRouter from "./routes/ProductRoute.ts";
app.use(express.json());
app.use("/", userRouter)
app.use("/", customerRouter)
app.use("/", productRouter)
// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(process.env.PORT, ()=>{
    console.log("server is running in "+process.env.PORT)
    console.log("swagger-ui server running on " +"http://localhost:3000/api-docs/")
})