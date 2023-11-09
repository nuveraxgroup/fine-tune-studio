import express from 'express';
import { mainRouter } from "./main.router";
const prefix = process.env.BASE_PREFIX ?? '/api';
export const apiRouter = express.Router()

apiRouter.use(prefix, mainRouter);