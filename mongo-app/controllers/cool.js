import express from 'express'
const { Router } = express

const coolRouter = Router()

coolRouter.get('/cool', (req, res, next)=>{
  res.send("I'm so cool")
})

export default coolRouter

