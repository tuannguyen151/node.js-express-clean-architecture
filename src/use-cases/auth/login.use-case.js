import config from '../../config'

const { createCommonError } = config
const { login: loginError } = config.errorMessages.auth

const loginParams = (params) => {
  const { account, password } = params.body

  if (account && password) return { account, password }

  throw createCommonError({
    type: 'ACCOUNT_PASSWORD_REQUIRED',
    message: loginError.accountPasswordNotEmpty
  })
}

const findUser = async (userRepository, account) => {
  const user = await userRepository.findOneBy({
    orParams: [{ email: account }, { username: account }, { phone: account }]
  })

  if (!user)
    throw createCommonError({
      type: 'ACCOUNT_NOT_FOUND',
      message: loginError.accountNotFound
    })

  return user
}

export default async (userRepository, authService, { body }) => {
  const params = loginParams({ body })

  const user = await findUser(userRepository, params.account)

  const isMatch = authService.compare(params.password, user.password)
  if (!isMatch)
    throw createCommonError({
      type: 'PASSWORD_INCORRECT',
      message: loginError.passwordIncorrect
    })

  const token = authService.generateToken({
    user: { id: user.id }
  })

  return { token }
}
