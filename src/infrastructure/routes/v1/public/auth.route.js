import express from 'express'
import makeCallback from '../make-callback'

import authController from '../../../../adapters/controllers/v1/auth.controller'
import userRepository from '../../../database/mysql/repositories/user.repository'
import authService from '../../../services/auth.service'

const router = express.Router()

router
  .route('/auth/login')
  .post(makeCallback(authController(userRepository, authService).login))

export default router
