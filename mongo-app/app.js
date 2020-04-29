import express from 'express'
import bodyparser from 'body-parser'
import contactRouter from './routes/contact.js'
import genreRouter from './routes/genre.js'
import authorRouter from './routes/author.js'

const app = express()

app.use(bodyparser.json())

app.use('/contact', contactRouter)

app.use('/genre', genreRouter)

app.use('/author', authorRouter)

export default app
