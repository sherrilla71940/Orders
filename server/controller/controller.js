const { getAll, postOne, updateOne, createUser, logInUser } = require('../model/model')
const jwt = require('jsonwebtoken')

// create token
// const maxAge = 3 * 24 * 60 * 60;
// const createToken = (id) => {
//   return jwt.sign({ id }, 'secret', {
//     // expiresIn: maxAge
//   })
// }
// aaron: changing creatToken
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    expiresIn: "3hr",
    algorithm: "HS256"
  })
}

const getOrders = async (req, res) => {
  try {
    const orders = await getAll()
    res.status(201)
    res.send(orders)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send('stuck in controller')
  }
}

const postOrder = (req, res) => {
  console.log('reached the controller', req.body)
  try {
    const order = postOne(req.body)
    res.status(201)
    res.send(order)
  } catch (error) {
    console.log(error)
    res.status(400)
    res.send('stuck in controller')
  }
}

const putOrder = async (req, res) => {
  try {
    const order = await updateOne(req.body)
    // res.json({message: 'ok'})
    res.send(order)
  } catch (error) {
    console.log(error)
  }
}

const signUp = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  console.log('reached controller')
  let responseUser;
  try {
    responseUser = await createUser(email, password)
    console.log('responseuser', responseUser)

    if (responseUser._id) {
      const token = createToken(responseUser._id)
      res.status(201)
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'none',
        // aaron: Not running in https so turning secure to false
        // secure: true,
        // currently not making client store cookie
        secure: false
        // maxAge: maxAge * 1000
      })
      res.json({ user: responseUser._id })
    } else {
      res.json({ responseUser })
    }
  } catch (error) {
    res.status(400)
    res.json(error) // ?
  }
}


const logIn = async (req, res) => {
  const { email, password } = req.body
  console.log('login reached', req.body)
  try {
    const response = await logInUser(email, password)

    // console.log(response)

    if (response._id) {

      res.status(200)
      const token = createToken(response._id)
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: 'none',
        // aaron: changing secure to false
        // secure: true,
        secure: false
        // maxAge: maxAge * 1000
      })
      // console.log(res.get('Set-Cookie'))
      res.json({ user: response._id })
      // res.json({ user: res.cookie })
    } else {
      res.json({ response })
    }
  } catch (error) {
    console.log(error)
    res.status(400)
    res.json(error) // ?
  }
}

module.exports = { getOrders, postOrder, putOrder, signUp, logIn }