import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
            id="title"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
                    author:
          <input
            id="author"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          /></div>
        <div>
                    url:
          <input
            id="url"
            value={url}
            name="url"
            onChange={handleUrlChange}
          /></div>
        <button type="submit" id="create">create</button>
      </div>
    </form>
  )
}

CreateForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default CreateForm