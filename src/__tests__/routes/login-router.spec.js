const LoginRouter = require('../../presentation/routes/login-router')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      return { email, password }
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  return {
    sut,
    authUseCaseSpy
  }
}

describe('Login router', () => {
  test('Should return 400 if no email is provider', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: '12345678'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
  test('Should return 400 if no password is provider', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })

  test('Should return 500 if some implementation error occurred', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route({})
    expect(httpResponse.status).toBe(500)
  })
})
