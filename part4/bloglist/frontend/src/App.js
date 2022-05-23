import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
  
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`${user.name} has logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  setMessage('Logout successful')
    setTimeout(() =>{
      setMessage(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setMessage(`A new blog "${blogObject.title}" has been added.`)
    setTimeout(() =>{
      setMessage(null)
    }, 3000)
  }

  const deleteBlog = async (blog) => {
    const response = await blogService.deleteBlog(blog.id)
    console.log(response)
    if (response){
      setBlogs(blogs.filter(b => blog.id !== b.id))
      setMessage('Blog deleted')
      setTimeout(() =>{
        setMessage(null)
      }, 3000)
    }
  }

  const handleLike = async (blog) => {
    console.log(blog)
    const newObject = {
      user: blog.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log(newObject)
    await blogService.update(blog.id, newObject)
    const res = await blogService.getAll()
    setBlogs(res)
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const content = () => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    return (
      <div>
        <Notification message={message} />
        <h2>Bloglist</h2>
        <div>
          {`${user.name} is logged in`}
          <button onClick={handleLogout}>
            logout
          </button>
        </div>
        <div>
          {blogForm()}
        </div>
        <div>
          <h3>Blogs</h3>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike}
             handleDelete={deleteBlog} />
          )}
        </div>
        
      </div>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : content()}
    </div>
  )
}

export default App
