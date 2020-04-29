import { Request, Response } from 'express'
import Contact from '../model/contact'

// database
// let id = 100
// const database: IContact[] = [
//     {
//         id: `${id++}`,
//         firstname: 'Pasi',
//         lastname: 'Toivanen',
//         nickname: 'asdf',
//         title: 'Minä',
//         phone: [
//             '010 000 0000',
//             '020 000 0000'
//         ],
//         mobile: [
//             '045 000 0000',
//             '044 000 0000'
//         ],
//         email: ['somebody@email.com'],
//         street: 'Testaajankatu 1',
//         postcode: '00100',
//         city: 'Helsinki',
//         country: 'Suomi'
//     }
// ]
interface IContact extends INewContact {
    id: string
}
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

// Controllers

export const contactGet = (request: Request, response: Response) => {
    // return response.status(200).json(database)
    const contacts = Contact.find({}).then((data) => {
        return response.status(200).json(data)
    }).catch(error => {
        return response.status(404).send({ message: 'Bad request' })
    })
}

interface IPostContactRequest extends Request {
    body: INewContact
}
export const contactPost = (request: IPostContactRequest, response: Response) => {
    const body: INewContact = request.body
    if (!body || !body.firstname || !body.lastname || !body.nickname || !body.title
        || !body.phone || !body.mobile || !body.email || !body.street || !body.postcode
        || !body.city || !body.country
    ) {
        return response.status(422).json({ message: 'provide required data' })
    }

    const newContact = new Contact({
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
    })
    newContact.save().then(data => {
        return response.status(200).json(data)
    }).catch(error => {
        return response.status(404).send({ message: 'Bad request' })
    })

    // database.push(newContact) // TODO: replace with mongoDB
    // return response.status(200).json({ message: 'success !!' })
}

interface IPutContactRequest extends Request {
    body: IContact
}
export const contactPut = (request: IPutContactRequest, response: Response) => {
    const body: IContact = request.body
    const id = request.params.id

    Contact.findOneAndUpdate({ _id: id }, request.body).then(data => {
        return response.status(200).json(data)
    }).catch(error => {
        return response.status(404).send({ message: 'Bad request' })
    })

    // database.splice(database.findIndex(contact => contact.id === body.id), 1, body) // TODO: replace with mongoDB
    // return response.status(200).json({ message: 'success !!' })
}

export const contactDelete = (request: Request, response: Response) => {
    const id = request.params.id

    Contact.findOneAndRemove({ _id: id }).then(data => {
        response.status(200).json(data)
    }).catch(error => {
        response.status(404).send({ message: 'Bad request' })
    })
    // database.splice(database.findIndex(contact => contact.id === tempid), 1) // TODO: replace with mongoDB
    // return response.status(204).json({ message: 'not found' })
}