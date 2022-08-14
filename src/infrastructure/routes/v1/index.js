import express from 'express'
import publicRouter from './public'
import privateRouter from './private'

const router = express.Router()

router.use(publicRouter)
router.use(privateRouter)

export default router
