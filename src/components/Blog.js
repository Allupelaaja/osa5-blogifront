import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

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
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={startUpdate}>like</button>
        <br />
        {blog.user.name === undefined ?
          blog.user.username :
          blog.user.name
        }
        <br />
        <button
          onClick={startDelete}
          style={user.username === blog.user.username ? showWhenVisible : hideWhenVisible}
        >remove</button>
      </div>
    </div>
  )
}

export default Blog