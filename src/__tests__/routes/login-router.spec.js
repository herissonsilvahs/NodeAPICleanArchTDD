const LoginRouter = require('../../presentation/routes/login-router')

const makeEmailValidator = () => {
  class EmailValidator {
    isValid (email) {
      return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    }
  }
  return new EmailValidator()
}

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    auth (email, password) {
      this.email = email
      this.password = password
      return this.accessToken
    }
  }
  return new AuthUseCaseSpy()
}

const makeSut = () => {
  const authUseCaseSpy = makeAuthUseCase()
  const emailValidatorSpy = makeEmailValidator()
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy)
  return {
    sut,
    authUseCaseSpy,
    emailValidatorSpy
  }
}

describe('Login router', () => {
  test('Should return 400 if no email is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: '12345678'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
  test('Should return 400 if no password is provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })

  test('Should return 500 if some implementation error occurred', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.route({})
    expect(httpResponse.status).toBe(500)
  })
  test('Should call AuthUseCase with correct params', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com',
        password: '12345678'
      }
    }
    await sut.route(httpRequest)
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email)
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
  })
  test('Should return 401 when invalid credentials', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: 'novalid@gmail.com',
        password: '12345678'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.status).toBe(401)
  })
  test('Should return 200 when valid credentials', async () => {
    const { sut, authUseCaseSpy } = makeSut()
    authUseCaseSpy.accessToken = 'any_token'
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com',
        password: '12345678'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.status).toBe(200)
  })
  test('Should return 400 if email is invalid', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'herissongmail.com',
        password: '12345678'
      }
    }
    const httpResponse = await sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
})
