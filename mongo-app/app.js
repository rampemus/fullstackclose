import express from 'express'
import coolRouter from './controllers/cool.js'
import { getContact } from './controllers/contactController.js'
import bodyparser from 'body-parser'

const app = express()

app.use(bodyparser.json())

app.use('/api', coolRouter)
app.use('/contact', getContact)

export default app
