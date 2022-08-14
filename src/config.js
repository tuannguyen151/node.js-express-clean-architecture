export default {
  mysql: {
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT
  },
  createCommonError: ({ statusCode = 400, type, message }) => {
    const error = new Error(message)
    error.type = type
    error.statusCode = statusCode

    return error
  }
}
