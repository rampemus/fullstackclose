import express from 'express'
import { authorList, authorDetail } from '../controllers/authorController.js'

const authorRouter = express.Router()

authorRouter.get('/', authorList)
authorRouter.get('/:id', authorDetail)

export default authorRouter
