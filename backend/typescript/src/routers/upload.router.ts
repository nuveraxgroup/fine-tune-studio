import express from 'express'
import multer from 'multer'
import * as fs from "fs"
import OpenAI from 'openai'
import { DeleteFile, UploadToOpenAI } from "../models/file.dto";
import { jsonlFileFilter as fileFilter, readDirSync, storage, tempLocalFiles } from "../utils/multer";

const upload = multer({
  storage,
  // dest: tempLocalFiles,
  fileFilter
});
export const openai = new OpenAI();

export const uploadRouter = express.Router()

uploadRouter.post("/jsonl", upload.single('file'), async (req, res, next) => {
  res.json({ file: req.file })
})

uploadRouter.post("/jsonl-del", async (req, res, next) => {
  const bd: DeleteFile = req.body
  console.log("bd", bd)
  bd.fileNames.forEach((e) => {
    const fileLoc = `${tempLocalFiles}/${e}`
    fs.unlinkSync(fileLoc)
  })
  res.json({ success: true })
})

uploadRouter.get("/temp", async (req, res, next) => {
  const files = readDirSync(tempLocalFiles)
  res.json({ files })
})

uploadRouter.post("/push", async (req, res, next) => {
  const bd: UploadToOpenAI = req.body
  const fileLoc = `${tempLocalFiles}/${bd.fileName}`
  const fineTuneFile = await openai.files.create({ file: fs.createReadStream(fileLoc), purpose: 'fine-tune' })
  fs.unlinkSync(fileLoc)
  const fineTune = await openai.fineTuning.jobs.create({ training_file: fineTuneFile.id, model: 'gpt-3.5-turbo' })
  res.json({ fineTuneFile: fineTuneFile, fineTuneJob: fineTune });
})