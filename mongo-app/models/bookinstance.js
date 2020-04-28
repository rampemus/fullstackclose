import mongoose from 'mongoose'

var Schema = mongoose.Schema

var BookInstanceSchema = new Schema({
  book: { type: Schema.ObjectId, ref: 'Book', required: true }, // Reference to the associated book.
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: [
    'Available',
    'Maintenance',
    'Loaned',
    'Reserved'
  ],
  default:'Maintenance'},
  dueBack: { type: Date, default: Date.now }
})

// Virtual for this bookinstance object's URL.
BookInstanceSchema
  .virtual('url')
  .get(function () {
    return '/catalog/bookinstance/'+this._id
  })

// Export model.
export default mongoose.model('BookInstance', BookInstanceSchema)
