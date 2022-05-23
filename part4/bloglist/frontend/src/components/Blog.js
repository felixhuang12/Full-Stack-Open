import { React, useState } from 'react'

const Blog = ({blog, handleLike, handleDelete}) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemove = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON && blog.user){
      const user = JSON.parse(loggedUserJSON)
      if (blog.user.username === user.username){
        return (
          <div>
            <button onClick={() => handleDelete(blog)}>
              remove
            </button>
          </div>
        )        
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author}
        <button onClick={toggleVisibility}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
      {blog.title} by {blog.author} 
      <button onClick={toggleVisibility}>
          hide
        </button>
      <br/>
        Url: {blog.url}
        <br/> 
        Likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>
          Like
        </button>
        <br/>
        {showRemove()}
      </div>
    </div>
  )  
}

export default Blog