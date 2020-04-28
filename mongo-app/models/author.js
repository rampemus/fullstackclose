import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  firstName: { type: String, required: true, max: 100},
  familyName: { type: String, required: true, max: 100},
  dateOfBirth: { type: Date },
  dateOfDeath: { type: Date }
})

AuthorSchema.virtual('name').get(()=>{
  let fullname = ''
  if (this.firstName && this.familyName) {
    fullname = this.familyName + ', ' + this.firstName;
  }

  if (!this.firstName && !this.familyName) {
    fullname = '';
  }

  return fullname
})

const Author = mongoose.model('Author', AuthorSchema)

export default Author

