import express from 'express'
import coolRouter from './controllers/cool.js'

const app = express()

app.use('/api', coolRouter)

export default app
