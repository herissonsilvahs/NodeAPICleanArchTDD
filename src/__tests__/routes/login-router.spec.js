const LoginRouter = require('../../presentation/routes/login-router')

describe('Login router', () => {
  test('Should return 400 if no email is provider', () => {
    const sut = LoginRouter
    const httpRequest = {
      body: {
        password: '12345678'
      }
    }

    const httpResponse = sut.loginRouter(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
  test('Should return 400 if no password is provider', () => {
    const sut = LoginRouter
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com'
      }
    }

    const httpResponse = sut.loginRouter(httpRequest)
    expect(httpResponse.status).toBe(400)
  })

  test('Should return 500 if some implementation error occurred', () => {
    const sut = LoginRouter
    const httpResponse = sut.loginRouter()
    expect(httpResponse.status).toBe(500)
  })
})
