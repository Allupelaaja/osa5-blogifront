import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
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

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible === false ? 'view' : 'hide'}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {blog.user.name === undefined ?
          blog.user.username :
          blog.user.name
        }
      </div>
    </div>
  )
}

export default Blog