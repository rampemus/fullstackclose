import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import bodyParser from 'body-parser'

// database
type List = String[]
interface INewContact {
  firstname: String,
  lastname: String,
  nickname: String,
  title: String,
  phone: List,
  mobile: List,
  email: List,
  street: String,
  postcode: String,
  city: String,
  country: String,
}
interface IContact extends INewContact {
  id: Number
}
let id = 100
let database: IContact[] = [
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

// initialization

let app = express()
let port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

// rest API

app.get('/api/contact', (request: Request, response: Response) => {
  return response.status(200).json(database)
})
interface IPostContactRequest extends Request {
  body: INewContact
}
app.post('/api/contact', (request: IPostContactRequest, response: Response) => {
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
app.put('/api/contact/', (request: IPutContactRequest, response: Response) => {
  const body: IContact = request.body
  database.splice(database.findIndex(contact => contact.id === body.id),1,body)
  return response.status(200).json({ message: 'success !!'})
})
app.delete('/api/contact/:id', (request: Request, response: Response) => {
  let tempid = parseInt(request.params.id, 10)
  const deletedContact = database.splice(database.findIndex(contact => contact.id === tempid),1)
  return response.status(204).json({ message: 'not found'})
})

// listen for API calls

app.listen(port)
console.log(`server is listening on ${port}`)
