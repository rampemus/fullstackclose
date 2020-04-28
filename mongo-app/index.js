import coolRouter from './controllers/cool.js'
import mongoose from 'mongoose'
import app from './app.js'

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/testdb',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.listen(port)
console.log('App listening to port ' + port)
