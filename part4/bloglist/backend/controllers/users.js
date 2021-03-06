const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {
        url: 1, title: 1, author: 1
    })
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if (username.length < 3 || password.length < 3){
      return response.status(400).json({
          error: 'Username and password must be at least 3 characters long'
      })
  }
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  // password itself is not stored in db
  // hash of password that's generated from bcrypt.hash is stored in db

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  return response.status(201).json(savedUser)
})

module.exports = usersRouter