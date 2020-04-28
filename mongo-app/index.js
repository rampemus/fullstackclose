import express from 'express'
import coolRouter from './controllers/cool.js'

console.log('Hello there')

const port = 3000
const app = express()

app.use('/api', coolRouter)

app.listen(port)
console.log('App  listening to port ' + port)

