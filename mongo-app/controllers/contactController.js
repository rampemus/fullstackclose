import Contact from '../models/contact.js'

export const getContact = (req, res, next) => {
  const contacts = Contact.find({}).then((data) => {
    res.status(200).json(data)
  }).catch(error =>{
    res.status(404).send({ message: 'Bad request' })
  })
}

export const getContactById = (req, res, next) => {
  const contact = Contact.findOne({ _id: req.params.id }).then((data)=>{
    res.status(200).json(data)
  }).catch(error => {
    res.status(404).send({ message: 'Bad request'})
  })
}

export const postContact = (req, res, next) => {
  console.log(req.body)
  // TODO: validate body
  const newContact = new Contact(req.body)
  newContact.save().then(data =>{
    res.status(200).json(data)
  }).catch(error => {
    res.status(404).send({ message: 'Bad request' })
  })
}

export const putContact = (req, res, next) => {
  const id = req.params.id

  // TODO: validate body
  // TODO: do we need option { new: true } ???
  Contact.findOneAndUpdate({ _id: id }, req.body).then(data => {
    res.status(200).json(data)
  }).catch(error => {
    res.status(404).send({ message: 'Bad request' })
  })
}

export const deleteContact = (req, res, next) => {
  const id = req.params.id

  Contact.findOneAndRemove({ _id: id }).then(data => {
    res.status(200).json(data)
  }).catch(error => {
    res.status(404).send({ message: 'Bad request'})
  })
}

