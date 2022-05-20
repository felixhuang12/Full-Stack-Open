const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const result = await Blog.find({})
    return (response.json(result))
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
    const result = await blog.save()
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