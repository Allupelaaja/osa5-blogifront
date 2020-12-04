import React from 'react'

const createForm = ({
    handleCreate,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url
}) => (
        <form onSubmit={handleCreate}>
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

export default createForm