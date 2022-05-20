const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7) // isolate token after bearer
    }
    return null
  }

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user',
    {username: 1, name: 1})
    return (response.json(result))
})

blogRouter.post('/', async (request, response) => {
    const token = getTokenFrom(request)
    const body = request.body
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const result = await blog.save()
    console.log(result)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    return response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    if (blogToDelete){
        await Blog.findByIdAndRemove(request.params.id)
        return response.status(204).end()
    }
    else{
        return response.status(404).end()
    } 
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(updatedBlog)
})

module.exports = blogRouter