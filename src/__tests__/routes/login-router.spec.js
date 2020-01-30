const LoginRouter = require('../../presentation/routes/login-router')

const makeSut = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
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
  test('Should call AuthUseCase with correct params', () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com',
        password: '12345678'
      }
    }
    sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
  test('Should return 401 when invalid credentials', () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: 'novalid@gmail.com',
        password: '12345678'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(401)
  })
  test('Should return 200 when valid credentials', () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = 'any_token'
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com',
        password: '12345678'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(200)
  })
})
