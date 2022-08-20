import authUseCase from '../../../use-cases/auth'

export default (userRepository, authService) => {
  const login = (httpRequest) =>
    authUseCase.login(userRepository, authService, httpRequest)

  return {
    login
  }
}
