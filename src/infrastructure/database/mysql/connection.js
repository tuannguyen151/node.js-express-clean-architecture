import { Sequelize } from 'sequelize'
import config from '../../../config'

const sequelize = new Sequelize(
  config.mysql.MYSQL_DATABASE,
  config.mysql.MYSQL_USER,
  config.mysql.MYSQL_PASSWORD,
  {
    host: config.mysql.MYSQL_HOST,
    port: config.mysql.MYSQL_PORT,
    dialect: 'mysql'
  }
)

export default sequelize
