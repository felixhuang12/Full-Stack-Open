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
    marginRight: 15,
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
            <div className='d-flex justify-content-start mt-2'>
              <div style={hideUpdateWhenVisible}>
                <Button className='mb-3' onClick={toggleUpdateForm} variant="outline-dark">Update</Button>
              </div>
              <Button className='ms-2 mb-3' variant="outline-danger" onClick={() => handleDelete(blog)}>
                Remove
              </Button>
            </div>
            <div style={showUpdateWhenVisible}>
              <Form onSubmit={() => handleUpdate(blog, {
                user: blog.user.id,
                likes: newLikes,
                title: newTitle,
                author: newAuthor,
                url: newURL
              })} >
                <h5>Update Blog</h5>
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
              <Button className='ms-3 mx-1 mb-3' type="submit" variant="outline-success">Update</Button>
              <Button className='mx-1 mb-3' onClick={toggleUpdateForm} variant="outline-danger">Cancel</Button>
              </Form>
            </div>
          </div>
        )        
      }
    }
  }

  return (
    <div className='ps-3' style={blogStyle}>
      <div style={hideWhenVisible}>
        <div className='d-flex justify-content-start'>
          <h5 className='mt-1'>{blog.title} by {blog.author}</h5>
          <Button className='mb-2 ms-2'variant='outline-dark' onClick={toggleVisibility}>
            View
          </Button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div className='d-flex justify-content-start'>
          <h5 className='mt-1'>{blog.title} by {blog.author}</h5>
          <Button className='mb-2 ms-2'variant='outline-dark' onClick={toggleVisibility}>
              Hide
          </Button> 
        </div>
          <br/>
          Url: <a href={blog.url}>{blog.url}</a>
          <br/>
            Likes: {blog.likes}
          <Button className='m-2'variant='outline-success' onClick={() => handleLike(blog)}>
            Like
          </Button>
          <br/>
          {showRemoveAndUpdate()}
      </div>
    </div>
  )  
}

export default Blog