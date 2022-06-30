import express from 'express'
import admin from './admin'
import user from './user'

const router = express.Router()

router.use('/admin', admin)
router.use('/user', user)

export default router
