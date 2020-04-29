import express from 'express'
import { genreList, genreDetail } from '../controllers/genreController.js'

const genreRouter = express.Router()

genreRouter.get('/', genreList)
genreRouter.get('/:id', genreDetail)

export default genreRouter
