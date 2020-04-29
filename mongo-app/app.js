import express from 'express'
import coolRouter from './controllers/cool.js'
import bodyparser from 'body-parser'
import contactRouter from './routes/contact.js'

const app = express()

app.use(bodyparser.json())

app.use('/api', coolRouter)

app.use('/contact', contactRouter)


export default app
