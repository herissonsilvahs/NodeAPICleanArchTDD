const LoginRouter = {
  route: (httpRequest) => {
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return { status: 400 }
    }
  }
}

describe('Login router', () => {
  test('Should return 400 if no email is provider', () => {
    const sut = LoginRouter
    const httpRequest = {
      body: {
        password: '12345678'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
  test('Should return 400 if no password is provider', () => {
    const sut = LoginRouter
    const httpRequest = {
      body: {
        email: 'herisson@gmail.com'
      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.status).toBe(400)
  })
})
