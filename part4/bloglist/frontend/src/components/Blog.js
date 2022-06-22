import { React, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Blog = ({blog, handleLike, handleDelete, handleUpdate}) => {
  const [visible, setVisible] = useState(false)
  const [updateVisible, setUpdateVisible] = useState(false)
  const [newTitle, setNewTitle] = useState(blog.title)
  const [newAuthor, setNewAuthor] = useState(blog.author)
  const [newURL, setNewURL] = useState(blog.url)
  const [newLikes, setNewLikes] = useState(blog.likes)
  const showWhenVisible = {display: visible ? '' : 'none'}
  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showUpdateWhenVisible = {display: updateVisible ? '' : 'none'}
  const hideUpdateWhenVisible = {display: updateVisible ? 'none' : ''}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleUpdateForm = () => {
    setUpdateVisible(!updateVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveAndUpdate = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON && blog.user){
      const user = JSON.parse(loggedUserJSON)
      if (blog.user.username === user.username){
        return (
          <div>
            <button onClick={() => handleDelete(blog)}>
              Remove
            </button>
            <div style={hideUpdateWhenVisible}>
              <Button onClick={toggleUpdateForm}>Update</Button>
            </div>
            <div style={showUpdateWhenVisible}>
              <Form onSubmit={() => handleUpdate(blog, {
                user: blog.user.id,
                likes: newLikes,
                title: newTitle,
                author: newAuthor,
                url: newURL
              })} >
                <h4>Update Blog</h4>
                <Form.Group as={Row} className="ms-3" controlId="title">
                  <Form.Label column sm="2">
                    Title
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={newTitle} onChange={({target}) => setNewTitle(target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="ms-3" controlId="author">
                  <Form.Label column sm="2">
                    Author
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={newAuthor} onChange={({target}) => setNewAuthor(target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="ms-3" controlId="url">
                  <Form.Label column sm="2">
                    URL
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="text" value={newURL} onChange={({target}) => setNewURL(target.value)} />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="ms-3" controlId="likes">
                  <Form.Label column sm="2">
                    Likes
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="number" value={newLikes} onChange={({target}) => setNewLikes(target.value)} />
                  </Col>
                </Form.Group>
              <Button type="submit">Update</Button>
              <Button onClick={toggleUpdateForm}>Cancel</Button>
              </Form>
            </div>
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
        Url: 
        <a href={blog.url}>{blog.url}</a>
        <br/> 
        Likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>
          Like
        </button>
        <br/>
        {showRemoveAndUpdate()}
      </div>
    </div>
  )  
}

export default Blog