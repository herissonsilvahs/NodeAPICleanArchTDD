module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!email || !password) {
        return { status: 400, body: { message: 'Missing params' } }
      }
      const accessToken = await this.authUseCase.auth(email, password)
      if (!accessToken) {
        return { status: 401, body: { message: 'Unauthorized' } }
      }
      return { status: 200, body: { message: 'Login succesfuly' } }
    } catch (err) {
      return {
        status: 500,
        body: { message: 'Internal error' }
      }
    }
  }
}
