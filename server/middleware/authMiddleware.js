const jwt = require('jsonwebtoken')

// the following middleware is not yet fully implemented
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, 'secret', { algorithms: ["HS256"] }, (error, decodedToken) => {
      if (error) {
        console.log(error)
        res.redirect('/login')
      } else {
        console.log(decodedToken)
        return next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = { requireAuth }