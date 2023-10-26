import multer, { FileFilterCallback } from 'multer';
import express from 'express'
import * as fs from "fs"
import { FileDir } from "../models/file.dto";
import * as path from "path"
import * as os from "os"
export const tempLocalFiles = path.join(os.tmpdir(), "jsonl-files");
export const jsonlFileFilter = (
  request: express.Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === 'application/octet-stream' &&
    file.originalname.endsWith("jsonl")
  ) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(tempLocalFiles)){
      fs.mkdirSync(tempLocalFiles, { recursive: true });
    }
    cb(null, tempLocalFiles)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}.${ext(file.originalname)}`)
  }
})

const ext = (filename: string): string => {
  const split = filename.split(".")
  return split[split.length - 1]
}

export const readDirSync = (path: string): FileDir[] => {
  const dir = fs.opendirSync(path)
  let entity: fs.Dirent = null;
  const listing: FileDir[] = []
  while((entity = dir.readSync()) !== null) {
    if(entity.isFile()) {
      listing.push({ type: 'f', name: entity.name })
    } else if(entity.isDirectory()) {
      listing.push({ type: 'd', name: entity.name })
    }
  }
  dir.closeSync()
  return listing
}