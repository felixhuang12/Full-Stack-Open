import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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
      console.log(error)
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
      <div className='d-flex justify-content-center vh-100'>
        <div className='p-1 align-self-center h-75'>
        <h2>Log in to Bloglist Application</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className='mb-3' controlId='formLoginUser'>
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  value={username} 
                  onChange={({ target }) => setUsername(target.value)}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formLoginPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password} 
                  onChange={({ target }) => setPassword(target.value)}
                />
            </Form.Group>
            <Button type="submit" variant="dark">Login</Button>
          </Form>
          <Button 
            className='mt-2' 
            onClick={() => setCreateUser(true)} 
            variant="dark"
          >
            New? Click to create a new account
          </Button>
        </div>
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
        setSuccessMessage(`Blog account with username ${response.username} created.`)
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
      <div className='d-flex justify-content-center vh-100'>
        <div className="p-1 align-self-center h-75">
          <Form onSubmit={handleCreateUser}>
            <h2>Create New User</h2> 
            <Form.Group className='mb-3' controlId='formNewUser'>
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={name} 
                placeholder='Lee Ji Eun'
                onChange={({target}) => setName(target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formNewUsername'>
              <Form.Label>New username</Form.Label>
              <Form.Control 
                type="text" 
                value={newUsername} 
                placeholder='bigpaws16'
                onChange={({target}) => setNewUsername(target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formNewPassword'>
              <Form.Label>New password</Form.Label>
              <Form.Control 
                type="password" 
                value={newPassword} 
                onChange={({target}) => setNewPassword(target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formConfirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control 
                type="password" 
                value={confirmPassword} 
                onChange={({target}) => setConfirmPassword(target.value)}
              />
            </Form.Group>
          </Form>
          <Button type="submit" variant="dark">Create new user</Button>
          <Button className="ms-2" variant="dark" onClick={() => {
            setCreateUser(false)
            setNewUsername('')
            setNewPassword('')
            setConfirmPassword('')
          }}>
            Cancel
          </Button>
        </div>
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

  const updateBlog = async (blog, newBlog) => {
    await blogService.update(blog.id, newBlog)
    const res = await blogService.getAll()
    setBlogs(res)
  }

  const handleLike = async (blog) => {
    console.log(blog)
    console.log(blog.user)
    const newObject = {
      user: blog.user.id,
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
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
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
      <div className='ms-3'>
        <h1 className='d-flex justify-content-center mt-3'>Bloglist</h1>
        <div className='d-flex justify-content-center'>
          <div className='align-self-center'>{`${user.name} is logged in`}</div>
          <Button className='ms-2' variant='outline-dark' onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div>
          {blogForm()}
        </div>
        <div>
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike}
             handleDelete={deleteBlog} handleUpdate={updateBlog} />
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