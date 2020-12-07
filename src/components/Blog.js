import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)

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

  const startUpdate = (event) => {
    event.preventDefault()
    updateBlog(blog)
  }

  const startDelete = (event) => {
    event.preventDefault()
    if (window.confirm("Remove blog " + blog.title + " by " + blog.author)) {
      deleteBlog(blog)
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible === false ? 'view' : 'hide'}</button>
      {visible ?
        <div>
          {blog.url}
          <br />
        likes {blog.likes} <button onClick={startUpdate}>like</button>
          <br />
          {blog.user.name === undefined ?
            blog.user.username :
            blog.user.name
          }
          <br />
          {user.username === blog.user.username ? <button
            onClick={startDelete}
          >remove</button>
            : <></>}
        </div>
        :
        <></>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog