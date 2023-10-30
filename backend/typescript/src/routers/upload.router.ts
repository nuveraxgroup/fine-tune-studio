import express from 'express'
import multer from 'multer'
import * as fs from "fs"
import OpenAI from 'openai'
import { AnalyzeFile, DeleteFile, UploadToOpenAI } from "../models/file.dto";
import { jsonlFileFilter as fileFilter, readDirSync, storage, tempLocalFiles } from "../utils/multer";
import { jsonlAnalyze, numTokensFromMessages } from "../services/jsonl-analyze.service";

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
  bd.fileNames.forEach((e) => {
    const fileLoc = `${tempLocalFiles}/${e}`
    fs.unlinkSync(fileLoc)
  })
  res.json({ success: true })
})
uploadRouter.post("/jsonl-analytics", async (req, res, next) => {
  const analyzeFile: AnalyzeFile = req.body
  const fileLoc = `${tempLocalFiles}/${analyzeFile.fileName}`
  try {
    const fileContent = fs.readFileSync(fileLoc, { encoding: 'utf-8' })
    const lines = fileContent.split("\n")
    jsonlAnalyze(lines)
    const sampleSize = lines.length

    return res.json({
      sampleSize
    })
  } catch (e) {
    console.error(e)
    return res.json({ success: false })
  }
})

uploadRouter.get("/temp", async (req, res, next) => {
  const files = readDirSync(tempLocalFiles)
  res.json({ files })
})

uploadRouter.post("/push", async (req, res, next) => {
  const bd: UploadToOpenAI = req.body
  const trainingFileLoc = `${tempLocalFiles}/${bd.trainingFile}`
  const fineTuneTrainingFile = await openai.files.create({
    file: fs.createReadStream(trainingFileLoc),
    purpose: 'fine-tune'
  })
  fs.unlinkSync(trainingFileLoc)
  let fineTuneValidationFile: OpenAI.Files.FileObject = null
  if (bd.validationFIle) {
    const verificationFileLoc = `${tempLocalFiles}/${bd.validationFIle}`
    fineTuneValidationFile = await openai.files.create({
      file: fs.createReadStream(verificationFileLoc),
      purpose: 'fine-tune'
    })
    fs.unlinkSync(verificationFileLoc)
  }

  const fineTune = await openai.fineTuning.jobs.create({
    training_file: fineTuneTrainingFile.id,
    validation_file: fineTuneValidationFile !== null ? fineTuneValidationFile.id: undefined,
    model: 'gpt-3.5-turbo'
  })
  res.json({ fineTuneJob: fineTune });
})