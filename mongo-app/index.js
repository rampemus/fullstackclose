import coolRouter from './controllers/cool.js'
import mongoose from 'mongoose'
import App from './app.js'

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

App.listen(port)
console.log('App listening to port ' + port)
