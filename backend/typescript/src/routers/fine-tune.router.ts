import express from 'express'
import { uploadRouter } from "./upload.router";
import OpenAI from 'openai'

export const fineTuneRouter = express.Router()
export const openai = new OpenAI();

uploadRouter.get("/list", async (req, res, next) => {
  const limit = req.query["limit"] ?? 100
  const page = await openai.fineTuning.jobs.list({ limit: Number(limit) })
  res.send({ page })
})

uploadRouter.get("/retrieve/:id", async (req, res, next) => {
  const id = req.params["id"]
  const fineTune = await openai.fineTuning.jobs.retrieve(`${id}`)
  res.send({ fineTune })
})

uploadRouter.put("/cancel/:id", async (req, res, next) => {
  const id = req.params["id"]
  const status = await openai.fineTuning.jobs.cancel(`${id}`)
  res.send({ status })
})

uploadRouter.get("/ft-events/:id", async (req, res, next) => {
  const limit = req.query["limit"] ?? 100
  const id = req.params["id"]
  const events = await openai.fineTuning.jobs.listEvents(id, { limit: Number(limit) })
  res.send({ events })
})

uploadRouter.delete("/ft-model/:id", async (req, res, next) => {
  const id = req.params["id"]
  const events = await openai.models.del(id)
  res.send({ events })
})