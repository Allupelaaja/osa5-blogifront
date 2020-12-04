import React, { useState } from 'react'

const CreateForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }


    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('');
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <h2>create new</h2>
                <div>
                    title:
              <input
                        value={title}
                        name="title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
              <input
                        value={author}
                        name="author"
                        onChange={handleAuthorChange}
                    /></div>
                <div>
                    url:
              <input
                        value={url}
                        name="url"
                        onChange={handleUrlChange}
                    /></div>
                <button type="submit">create</button>
            </div>
        </form>
    )
}

export default CreateForm