import Contact from '../models/contact.js'

export const getContact = (req, res, next) => {
  const contacts = Contact.find({}).then((data) => {
    res.status(200).json(data)
  }).catch((error)=>{
    res.status(404).send({ message: 'Bad request' })
  })
}

// TODO: getContactById
// TODO: postContact
// TODO: putContact
// TODO: deleteContact


