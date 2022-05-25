import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [createUser, setCreateUser] = useState(false)
  const [name, setName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
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
      setSuccessMessage(`${user.name} has logged in`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error.response.data.error)
      setErrorMessage(error.response.data.error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      <div>
        <form onSubmit={handleLogin}>
          <h2>Log in to Bloglist Application</h2>
          <div>
            Username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
            <button type="submit">Login</button>
        </form>
        <button onClick={() => setCreateUser(true)}>New? Create new account</button>
      </div>
    )
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()
    if (newPassword !== confirmPassword){
      setErrorMessage('Passwords do not match. Please try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
    else{
      try{
        const newUser = {
          username: newUsername,
          name: name,
          password: newPassword
        }
        const response = await loginService.createUser(newUser)
        setCreateUser(false)
        setName('')
        setNewUsername('')
        setNewPassword('')
        setConfirmPassword('')
        setSuccessMessage(`Blog account with username ${response.username}
        created.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      } catch (error){
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      }
    }
  }

  const createUserForm = () => {
    return (
      <div>
        <form onSubmit={handleCreateUser}>
          <h2>Create New User</h2> 
          <div>
            Name
            <input
              type="text" 
              value={name} 
              name="new-name"
              onChange={({target}) => setName(target.value)}
            />
          </div>
          <div>
            New username
            <input
              type="text" 
              value={newUsername} 
              name="new-username"
              onChange={({target}) => setNewUsername(target.value)}
            />
          </div>
          <div>
            New password
            <input
              type="password" 
              value={newPassword} 
              name="new-password"
              onChange={({target}) => setNewPassword(target.value)}
            />
          </div>
          <div>
            Confirm password
            <input
              type="password" 
              value={confirmPassword} 
              name="confirm-password"
              onChange={({target}) => setConfirmPassword(target.value)}
            />
          </div>
          <button type="submit">Create new user</button>
        </form>
        <button onClick={() => {
          setCreateUser(false)
          setNewUsername('')
          setNewPassword('')
          setConfirmPassword('')
        }}>Cancel</button>
      </div>
    )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setSuccessMessage('Logout successful')
    setTimeout(() =>{
      setSuccessMessage(null)
    }, 3000)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`A new blog "${blogObject.title}" has been added.`)
    setTimeout(() =>{
      setSuccessMessage(null)
    }, 3000)
  }

  const deleteBlog = async (blog) => {
    const response = await blogService.deleteBlog(blog.id)
    console.log(response)
    if (response){
      setBlogs(blogs.filter(b => blog.id !== b.id))
      setSuccessMessage('Blog deleted')
      setTimeout(() =>{
        setSuccessMessage(null)
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
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
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
      <Notification errorMessage={errorMessage} 
        successMessage={successMessage} 
      />
      <div>
        {user !== null ? content() : createUser === true ? 
          createUserForm() : loginForm()
        }
      </div>
    </div>
  )
}

export default App
