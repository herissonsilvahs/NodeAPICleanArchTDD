module.exports = {
  loginRouter: (httpRequest) => {
    try {
      const { email, password } = httpRequest.body
      if (!email || !password) {
        return { status: 400, message: 'Missing params' }
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
