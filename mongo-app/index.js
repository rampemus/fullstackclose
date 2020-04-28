import express from 'express'
import coolRouter from './controllers/cool.js'
import mongoose from 'mongoose'

console.log('Hello there')

const port = 3000
const app = express()
mongoose.connect('mongodb://localhost',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use('/api', coolRouter)

app.listen(port)
console.log('App  listening to port ' + port)

