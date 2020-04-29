import express from 'express'
import { getContact, getContactById, postContact, putContact, deleteContact } from '../controllers/contactController.js'

const contactRouter = express.Router()

contactRouter.get('/', getContact)
contactRouter.get('/:id', getContactById)
contactRouter.post('/', postContact)
contactRouter.put('/:id', putContact)
contactRouter.delete('/:id', deleteContact)

export default contactRouter
