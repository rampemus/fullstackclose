import { Router, Request, Response } from 'express'

// database
type List = string[]
interface INewContact {
  firstname: string,
  lastname: string,
  nickname: string,
  title: string,
  phone: List,
  mobile: List,
  email: List,
  street: string,
  postcode: string,
  city: string,
  country: string,
}
interface IContact extends INewContact {
  id: number
}
let id = 100
const database: IContact[] = [
  {
    id: id++,
    firstname: 'Pasi',
    lastname: 'Toivanen',
    nickname: 'rampe',
    title: 'Minä',
    phone: [
      '010 000 0000',
      '020 000 0000'
    ],
    mobile: [
      '045 000 0000',
      '044 000 0000'
    ],
    email: ['somebody@email.com'],
    street: 'Testaajankatu 1',
    postcode: '00100',
    city: 'Helsinki',
    country: 'Suomi'
  }
]

const contactRouter = Router()

contactRouter.get('/contact', (request: Request, response: Response) => {
  return response.status(200).json(database)
})
interface IPostContactRequest extends Request {
  body: INewContact
}
contactRouter.post('/contact', (request: IPostContactRequest, response: Response) => {
  const body: INewContact = request.body
  if (!body
    || !body.firstname
    || !body.lastname
    || !body.nickname
    || !body.title
    || !body.phone
    || !body.mobile
    || !body.email
    || !body.street
    || !body.postcode
    || !body.city
    || !body.country
  ) {
    return response.status(422).json({ message: 'provide required data' })
  }
  const contact: IContact = {
    id: id++,
    firstname: body.firstname,
    lastname: body.lastname,
    nickname: body.nickname,
    title: body.title,
    phone: body.phone,
    mobile: body.mobile,
    email: body.email,
    street: body.street,
    postcode: body.postcode,
    city: body.city,
    country: body.country,
  }
  database.push(contact)
  return response.status(200).json({ message: 'success !!' })
})

interface IPutContactRequest extends Request {
  body: IContact
}
contactRouter.put('/contact/', (request: IPutContactRequest, response: Response) => {
  const body: IContact = request.body
  database.splice(database.findIndex(contact => contact.id === body.id),1,body)
  return response.status(200).json({ message: 'success !!'})
})
contactRouter.delete('/contact/:id', (request: Request, response: Response) => {
  const tempid = parseInt(request.params.id, 10)
  const deletedContact = database.splice(database.findIndex(contact => contact.id === tempid),1)
  return response.status(204).json({ message: 'not found'})
})

export default contactRouter
