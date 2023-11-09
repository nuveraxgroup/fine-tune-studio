import express from 'express';
import { apiRouter } from "./routers/router";
import * as fs from "fs"
import { tempLocalFiles } from "./utils/multer";
import cors from "cors"

const allowedOrigins = ['http://127.0.0.1:4200']
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
        'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["POST", "GET", "PUT", "DELETE"],
  // allowedHeaders: ["Authorization"],
  // exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  // credentials: true
}))
app.use(express.json())
app.use(apiRouter);

const server = app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});

const onClose = () => {
  // fs.rmSync(tempLocalFiles, { recursive: true, force: true })
  console.log(`[ stopped ] http://${host}:${port}`);
  server.close(() => {
    console.log('HTTP server closed')
  })
}

process.on('SIGINT', onClose)
process.on('SIGTERM', onClose)
