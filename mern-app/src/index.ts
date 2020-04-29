import express from 'express'
import cors from 'cors'
import { Request, Response } from 'express'
import contactRouter from './routers/contactRouter'
import bodyParser from 'body-parser'
import { createToken } from './utils/createToken'

// initialization

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(bodyParser.json())

// USER MANAGEMENT

interface IUsernamePasswordPair {
  username: string,
  password: string
}
interface ISession {
  username: string,
  ttl: number,
  token: string
}
interface IRegisterRequest extends Request {
  body: IUsernamePasswordPair
}
const registeredUsers: IUsernamePasswordPair[] = []
const loggedSessions: ISession[] = []
const timeToLiveDiff = 1000*60*60

app.post('/register', (request: IRegisterRequest, response: Response) => {
  const body = request.body
  if (!body || !body.username || !body.password) {
    return response.status(422).json({ message: 'Credentials missing 1'})
  }
  const existingUser = registeredUsers.find(user => user.username === body.username)
  if (existingUser) {
    return response.status(422).json({ message: 'Credentials missing 4' })
  }
  const newUser = body
  registeredUsers.push(newUser)
  return response.status(200).json({ message: 'success !!'})
})

interface ILoginRequest extends Request {
  body: IUsernamePasswordPair
}
app.post('/login',(request: ILoginRequest, response: Response) => {
  const body = request.body
  if (!body || !body.username || !body.password) {
    return response.status(422).json({ message: 'Credentials missing'})
  }
  const user = registeredUsers.find(registeredUser =>
    registeredUser.username === body.username && registeredUser.password === body.password)
  if (!user) {
    return response.status(422).json({ message: 'Credentials missing'})
  }
  const token = createToken()
  const newSession: ISession = {
    username: body.username,
    ttl: new Date().getTime() + timeToLiveDiff,
    token
  }
  loggedSessions.push(newSession)
  return response.status(200).json({ token })
})

const isUserLogged = (request: any, response: Response, next: ()=>void) => {
  const token = request.headers.token
  if(!token) {
    return response.status(403).json({ message: 'forbidden' })
  }
  const loggedSession = loggedSessions.find( session => session.token === token )
  if (!loggedSession) {
    return response.status(403).json({ message: 'forbidden'})
  }
  const dateNow = new Date().getTime()
  loggedSession.ttl = dateNow + timeToLiveDiff
  request.session = {}
  request.session.username = loggedSession.username
  return next()
}
app.use(isUserLogged)

app.post('/logout',(request: Request, response: Response) => {
  const token = request.headers.token
  if (!token) {
    return response.status(409).json({ message: 'Conflict' })
  }
  const sessionIndex = loggedSessions.findIndex(session => session.token === token)
  if(sessionIndex < 0) {
    return response.status(404).json({ message: 'Not found' })
  }
  loggedSessions.splice(sessionIndex, 1)
  return response.status(422).json({ message: 'Success !!'})
})

// rest API

app.use((request: IRegisterRequest, response: Response, next: () => void) => {
  console.log('Method:', request.method)
  console.log('Headers:', request.headers)
  next()
})

app.use('/api', contactRouter)

// listen for API calls

app.listen(port)
console.log(`server is listening on ${port}`)
