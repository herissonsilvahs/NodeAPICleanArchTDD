const LoginRouter = {
  route: (httpRequest) => {
    if (!httpRequest.body.email) {
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
})
