import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import contactRouter from './controllers/contactRouter'
import bodyParser from 'body-parser'

// initialization

let app = express()
let port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

// USER MANAGEMENT

interface IUser {
  username: String,
  password: String
}
interface ISession {
  username: String,
  ttl: Number,
  token: String
}
interface IRegister {
  username: String,
  password: String
}
interface IRegisterRequest extends Request {
  body: IRegister
}
let registeredUsers: IUser[] = []

app.post("/register", (request: IRegisterRequest, response: Response) => {
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
  console.log(registeredUsers)
  return response.status(200).json({ message: 'success !!'})
})

app.post("/login",(request: Request, response: Response) => {
  
})

app.post("/logout",(request: Request, response: Response) => {
  
})
// rest API

app.use('/api', contactRouter)

// listen for API calls

app.listen(port)
console.log(`server is listening on ${port}`)
