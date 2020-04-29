import { Router } from 'express'
import { contactPost, contactGet, contactPut, contactDelete } from '../controllers/contact'

const contactRouter = Router()

contactRouter.get('/contact', contactGet)
contactRouter.post('/contact', contactPost)
contactRouter.put('/contact/', contactPut)
contactRouter.delete('/contact/:id', contactDelete)

export default contactRouter
