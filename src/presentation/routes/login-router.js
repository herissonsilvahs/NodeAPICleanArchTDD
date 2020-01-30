module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email || !password) {
        return { status: 400, message: 'Missing params' }
      }
      this.authUseCase.auth(email, password)
    } catch (err) {
      return {
        status: 500,
        body: { message: 'Server error' }
      }
    }
  }
}
