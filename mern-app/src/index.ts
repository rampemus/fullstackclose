import express from 'express'
import bodyParser from 'body-parser'

// database
type List = String[]
interface IContact {
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
    id: Number
}
let database: IContact[] = []
let id = 100

console.log('running database:' + database)

// initialization

let app = express()
let port = process.env.PORT || 3001

app.use(bodyParser.json())

// rest API

app.get('/api/contact', (request, response) => {
    return response.status(200).json(database)
})

app.post('/api/contact', (request, response) => {
    const body: IContact = request.body
    console.log('got body ', body)
    if(!body) {
        return response.status(422)
    }
    if(!body.firstname || !body.lastname) {
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
    console.log(database)
    return response.status(200).json({ message: 'success !!' })
})

app.listen(port)
console.log(`server is listening on ${port}`)