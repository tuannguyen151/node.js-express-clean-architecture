/* eslint-disable import/extensions */

import 'dotenv/config'
import config from '../src/config.js'

export default {
  [process.env.NODE_ENV || 'development']: {
    username: config.mysql.MYSQL_USER,
    password: config.mysql.MYSQL_PASSWORD,
    database: config.mysql.MYSQL_DATABASE,
    host: config.mysql.MYSQL_HOST,
    port: config.mysql.MYSQL_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  }
}
