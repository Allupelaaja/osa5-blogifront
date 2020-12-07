import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateForm from './components/CreateForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFromRef = useRef()

  useEffect(() => {
    const getAllBlogs = async () => {
      const result = await blogService.getAll()
      result.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs(result)
    }
    getAllBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  Notification.propTypes = {
    message: PropTypes.string
  }

  const Error = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }

  Error.propTypes = {
    message: PropTypes.string
  }

  const handleUpdate = async (blogToUpdate) => {

    try {
      const updatedBlog = blogToUpdate
      updatedBlog.likes++
      const newBlog = await blogService.update(blogToUpdate.id, blogToUpdate)

      let newBlogs = [...blogs]
      newBlogs.splice(newBlogs.indexOf(blogToUpdate), newBlog)
      setBlogs(newBlogs)

      console.log('updated blog', updatedBlog.title)

      setNotificationMessage('blog ' + updatedBlog.title + ' updated')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('error updating blog')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async (blogToDelete) => {

    try {
      await blogService.remove(blogToDelete.id)

      let newBlogs = [...blogs]
      newBlogs.splice(newBlogs.indexOf(blogToDelete), 1)
      setBlogs(newBlogs)

      console.log('deleted blog', blogToDelete.title)

      setNotificationMessage('blog ' + blogToDelete.title + ' deleted')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('error deleting blog')
      console.log(exception)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleCreate = async (createdBlog) => {

    try {
      createdBlog.user = user
      const newBlog = await blogService.create(createdBlog)

      let newBlogs = [...blogs]
      newBlogs.push(newBlog)
      setBlogs(newBlogs)

      console.log('created new blog')

      setNotificationMessage('a new blog ' + newBlog.title + ' added')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      blogFromRef.current.toggleVisibility()
    } catch (exception) {
      setErrorMessage('error creating blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      console.log('userin tiedot:', user)

      setNotificationMessage('login successful')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logged out')

    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')

    setNotificationMessage('logged out')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>

      {user.name === undefined ?
        <div>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
        </div> :
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
      }

      <br />
      <Togglable buttonLabel="new blog" ref={blogFromRef}>
        <CreateForm createBlog={handleCreate} />
      </Togglable>

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleUpdate} deleteBlog={handleDelete} user={user}/>
        )}
      </div>
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      {user === null ?
        loginForm() :
        blogForm()
      }

    </div>
  )
}

export default App