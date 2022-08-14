import express from 'express'

const router = express.Router()

router.route('/ping').get((req, res) => {
  res.set('Content-Type', 'application/json')
  res.type('json')
  const body = {
    success: true,
    code: 200
  }

  res.status(200).send(body)
})

export default router
