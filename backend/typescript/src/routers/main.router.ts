import express from 'express';
import { uploadRouter } from "./upload.router";
import { fineTuneRouter } from "./fine-tune.router";

export const mainRouter = express.Router()

mainRouter.get('/home', (req, res) => {
    res.send({ message: 'Up' });
});

mainRouter.use("/upload", uploadRouter)
mainRouter.use("/fine-tune", fineTuneRouter)