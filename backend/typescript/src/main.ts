import express from 'express';
import { apiRouter } from "./routers/router";
import * as fs from "fs"
import { tempLocalFiles } from "./utils/multer";

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json())
app.use(apiRouter);

const server = app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

const onClose = () => {
  fs.rmSync(tempLocalFiles, { recursive: true, force: true })
  console.log(`[ stopped ] http://${host}:${port}`);
  server.close(() => {
    console.log('HTTP server closed')
  })
}

process.on('SIGINT', onClose)
process.on('SIGTERM', onClose)
