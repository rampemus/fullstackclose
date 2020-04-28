import express from 'express'
import coolRouter from './controllers/cool.js'

const App = express()

App.use('/api', coolRouter)

export default App
