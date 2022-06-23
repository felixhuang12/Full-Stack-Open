import { React, useState} from 'react'
import Button from 'react-bootstrap/Button'

const BlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        const blog = {
            title: title,
            author: author,
            url: url,
            likes: 0,
        }
        createBlog(blog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return(
        <form onSubmit={addBlog}>
            <h3 className='mt-2'>Create New Blog</h3>
            <div className='mt-2'>
                Title:
                <input
                    type="text" value={title} 
                    onChange={(event) => setTitle(event.target.value)}
                    className='ms-1'
                />
            </div>
            <div className='mt-2'>
                Author:
                <input
                    type="text" value={author} 
                    onChange={(event) => setAuthor(event.target.value)}
                    className='ms-1'
                />
            </div>
            <div className='mt-2'>
                Url:
                <input
                    type="text" value={url} 
                    onChange={(event) => setUrl(event.target.value)}
                    className='ms-1'
                />
            </div>
            <div className='mt-2 mb-1'>
                <Button variant='dark' type='submit'>
                    Create
                </Button>
            </div>
        </form>
    )
}

export default BlogForm