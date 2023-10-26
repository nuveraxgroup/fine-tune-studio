import express from 'express';
import { uploadRouter } from "./upload.router";

export const mainRouter = express.Router()

mainRouter.get('/home', (req, res) => {
    res.send({ message: 'Hello API' });
});

mainRouter.use("/upload", uploadRouter)