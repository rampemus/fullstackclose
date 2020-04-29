import express from 'express'
// import { } from '../controllers/bookController.js'
import { bookInstanceList, bookInstanceDetail, bookInstanceCreatePost } from '../controllers/bookInstanceController.js' 

const bookRouter = express.Router()

bookRouter.get('/instance', bookInstanceList)
bookRouter.get('/instance/:id', bookInstanceDetail)
bookRouter.post('/instance', bookInstanceCreatePost)

export default bookRouter
