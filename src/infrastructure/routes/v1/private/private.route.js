import express from 'express'
import authMiddleware from '../../middlewares/v1/auth.middleware'

const router = express.Router()

router.route('/private').get(authMiddleware, (req, res) => {
  res.send('private')
})

export default router
