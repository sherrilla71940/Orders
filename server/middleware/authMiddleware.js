const jwt = require('jsonwebtoken')

// the following middleware is not yet fully implemented
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'secret', (error, decodedToken) => {
      if (error) {
        console.log(error)
        res.redirect('/login')
      } else {
        console.log(decodedToken)
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = { requireAuth }