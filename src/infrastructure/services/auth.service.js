import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import config from '../../config'

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const compare = (password, hashedPassword) => {
  if (!hashedPassword) return false

  return bcrypt.compareSync(password, hashedPassword)
}

const verify = (token) => jwt.verify(token, config.jwt.JWT_SECRET)

const generateToken = (payload) =>
  jwt.sign(payload, config.jwt.JWT_SECRET, {
    expiresIn: config.jwt.JWT_EXPIRESIN
  })

export default {
  encryptPassword,
  compare,
  verify,
  generateToken
}
