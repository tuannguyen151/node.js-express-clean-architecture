export default {
  mysql: {
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
    MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    MYSQL_HOST: process.env.MYSQL_HOST,
    MYSQL_PORT: process.env.MYSQL_PORT
  },
  jwt: {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRESIN: process.env.JWT_EXPIRESIN || '365d'
  },
  createCommonError: ({ statusCode = 400, type, message }) => {
    const error = new Error(message)
    error.type = type
    error.statusCode = statusCode

    return error
  },
  errorMessages: {
    notNull: (key) => `${key} is not allowed to be empty`,
    isString: (key) => `${key} must be a string`,
    max: (key, maxLength) =>
      `${key} length must be less than or equal to ${maxLength} characters long`,
    valid: (key, values = []) => `${key} must be one of [${values.join(', ')}]`,
    username: `Username contains only A-Z, a-z, 0-9 and underscore`,
    phone: `Phone must be vietnamese phone number`,
    email: `Invalid email address`,
    auth: {
      login: {
        accountPasswordNotEmpty:
          'Account and Password is not allowed to be empty',
        accountNotFound: 'Email, phone or username not found',
        passwordIncorrect: 'Password incorrect'
      }
    }
  }
}
