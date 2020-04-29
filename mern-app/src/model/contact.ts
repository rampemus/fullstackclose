import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ContactSchema = new Schema({
    owner: String,
    firstname: String,
    lastname: String,
    nickname: String,
    title: String,
    phone: [String],
    mobile: [String],
    email: [String],
    street: String,
    postcode: String,
    city: String,
    country: String
})

const Contact = mongoose.model('Contact', ContactSchema)

export default Contact
