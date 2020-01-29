const LoginRouter = {
  route: (httpRequest) => {
    try {
      const { email, password } = httpRequest.body
      if (!email || !password) {
        return { status: 400 }
      }
    } catch (err) {
      const objError = {
        error: {
          errorName: err.name,
          errorMessage: err.message
        }
      }
      console.log('Error: ', objError)
      return { status: 500, message: 'Internal server error' }
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

  test('Should return 500 if some implementation error occurred', () => {
    const sut = LoginRouter
    const httpResponse = sut.route()
    expect(httpResponse.status).toBe(500)
  })
})
