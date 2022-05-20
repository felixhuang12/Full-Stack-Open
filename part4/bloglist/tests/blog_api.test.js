const mongoose = require('mongoose')
const testHelper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = testHelper.initialBlogs.map(blog => {
        return new Blog(blog)
    })
    const promiseBlogs = blogObjects.map(blog => blog.save())
    await Promise.all(promiseBlogs)
})

test('blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testHelper.initialBlogs.length)
})

test('add blog', async () => {
    const newBlog = {
      title: "MERN Stack",
      author: "Richard",
      url: "https://youtube.com/",
      likes: 234
    }

    await api.post('/api/blogs').send(newBlog).expect(201)
    const db = await testHelper.blogsinDb()
    expect(db).toHaveLength(testHelper.initialBlogs.length + 1)
})

test('delete', async () => {
    const newBlog = {
        title: "Fidelity",
        author: "lol",
        url: "https://youtube.com/",
        likes: 23
    }

    await api.post('/api/blogs').send(newBlog).expect(201)
    const allBlogs = await testHelper.blogsinDb()
    console.log(allBlogs)
    const blogToDelete = allBlogs.find(blog => blog.title === newBlog.title)
    console.log(blogToDelete)
    await api.delete(`/api/blogs/${blogToDelete.id}`)
        .set('Content-Type', 'application/json')
        .expect(204)
    const blogsAtEnd = await testHelper.blogsinDb()
    const contents = blogsAtEnd.map(r => r.title)
    console.log(contents)
    expect(contents).not.toContain(blogToDelete.title)

})

test('update', async() => {
    const newBlog = {
        title: "Fidelity",
        author: "lol",
        url: "https://youtube.com/",
        likes: 23
    }
    await api.post('/api/blogs').send(newBlog).expect(201)
    const update = {
        ...newBlog,
        likes: 1234
    }
    const allBlogs = await testHelper.blogsinDb()
    const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(update)
    const updatedBlog = (await testHelper.blogsinDb()).find(blog => blog.title === newBlog.title)
    expect(updatedBlog.likes).toBe(update.likes)
})

afterAll(() => {
    mongoose.connection.close()
})