import express from 'express'
import OpenAI from 'openai'
export const openai = new OpenAI();
export const fineTuneRouter = express.Router()
fineTuneRouter.get("/list", async (req, res, next) => {
  const limit = req.query["limit"] ?? 100
  const page = await openai.fineTuning.jobs.list({ limit: Number(limit) })
  res.json({ page })
})

fineTuneRouter.get("/retrieve/:id", async (req, res, next) => {
  const id = req.params["id"]
  const fineTune = await openai.fineTuning.jobs.retrieve(id)
  res.json({ fineTune })
})

fineTuneRouter.put("/cancel/:id", async (req, res, next) => {
  const id = req.params["id"]
  const status = await openai.fineTuning.jobs.cancel(id)
  res.json({ status })
})

fineTuneRouter.get("/events/:id", async (req, res, next) => {
  const limit = req.query["limit"] ?? 100
  const id = req.params["id"]
  const events = await openai.fineTuning.jobs.listEvents(id, { limit: Number(limit) })
  res.json({ events })
})

fineTuneRouter.delete("/model/:id", async (req, res, next) => {
  const id = req.params["id"]
  const events = await openai.models.del(id)
  res.json({ events })
})