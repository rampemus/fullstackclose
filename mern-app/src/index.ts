import express from 'express'

import cors from 'cors'
import { Request, Response } from 'express'
import contactRouter from './controllers/contactRouter'
import bodyParser from 'body-parser'

// initialization

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

// USER MANAGEMENT

interface IUser {
  username: string,
  password: string
}
interface ISession {
  username: string,
  ttl: number,
  token: string
}
interface IRegister {
  username: string,
  password: string
}
interface IRegisterRequest extends Request {
  body: IRegister
}
const registeredUsers: IUser[] = []

app.post('/register', (request: IRegisterRequest, response: Response) => {
  const body = request.body
  if (!body) {
    return response.status(422).json({ message: 'Credentials missing 1'})
  }
  if (!body.username || !body.password) {
    return response.status(422).json({ message: 'Cedentials missing 2'})
  }
  if ((body.username.length < 4 ) || (body.password.length < 8)) {
    return response.status(422).json({ message: 'Credentials missing 3'})
  }
  const existingUser = registeredUsers.find(user => user.username === body.username)
  if (existingUser) {
    return response.status(422).json({ message: 'Credentials missing 4' })
  }
  const newUser = body
  registeredUsers.push(newUser)

  return response.status(200).json({ message: 'success !!'})
})

app.post('/login',(request: Request, response: Response) => {
  return response.status(422).json({ message: 'Not ready'})
})

app.post('/logout',(request: Request, response: Response) => {
  return response.status(422).json({ message: 'Not ready'})
})
// rest API

app.use('/api', contactRouter)

// listen for API calls

app.listen(port)
console.log(`server is listening on ${port}`)
