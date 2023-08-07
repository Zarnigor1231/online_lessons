import express from "express";
import authRouter from "./routers/auth.router.js";
import categoryRouter from "./routers/category.router.js";
import videoRouter from "./routers/videos.router.js";
import commentRouter from "./routers/comment.router.js";
import userRouter from "./routers/users.router.js";
import swaggerJsDoc from 'swagger-jsdoc';
import {
    options
} from "./swagger/option.swagger.js";
import swaggerUI from 'swagger-ui-express';
import "dotenv/config";

const app = express();

const specs = swaggerJsDoc(options)

app.use(express.json());
app.use(authRouter);
app.use("/category", categoryRouter);
app.use("/video", videoRouter);
app.use("/comment", commentRouter);
app.use("/user", userRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server runing ...${PORT}`)
})