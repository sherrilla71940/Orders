const { getAll, postOne, updateOne, createUser } = require('../model/model')
const jwt = require('jsonwebtoken')

// create token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'secret', {
    // expiresIn: maxAge
  })
}

const getOrders = async (req, res) => {
  // console.log('reached the controller')
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
  // console.log('reached the controller', req.body)
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
  // console.log('testing put request: ', req.body)
  try {
    const order = await updateOne(req.body)
    // console.log(order)
    // res.json({message: 'ok'})
    res.send(order)
  } catch (error) {
    console.log(error)
  }
}

const signUp = async (req, res) => {
  const { email, password } = req.body;
  // console.log('signup request - controller')
  try {
    const user = await createUser(email, password)
    const token = createToken(user._id)
    res.status(201)
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      // maxAge: maxAge * 1000
    })
    res.json({user: user._id})
  } catch (error) {
    res.status(400)
    res.json({error})
    console.log(error)
  }
}

module.exports = { getOrders, postOrder, putOrder, signUp }