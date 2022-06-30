export default {
  mysql: {
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT
  },
  jwtSecret: process.env.JWT_SECRET || 'development',
  jwtExpiresIn: process.env.JWT_EXPIRESIN || '365d'
}
