import { React, useState} from 'react'

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
            <h3>Create new blog</h3>
            <div>
                Title:
                <input
                    type="text" value={title} 
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                Author:
                <input
                    type="text" value={author} 
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </div>
            <div>
                Url:
                <input
                    type="text" value={url} 
                    onChange={(event) => setUrl(event.target.value)}
                />
            </div>
            <div>
                <button type='submit'>
                    create
                </button>
            </div>
        </form>
    )
}

export default BlogForm