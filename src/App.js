import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getAllBlogs = async () => {
      const result = await blogService.getAll()
      setBlogs(result)
    }
    getAllBlogs()
  }, [blogs])

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

  const handleCreate = async (event) => {
    event.preventDefault()

    try {
      const createdBlog = {
        title: title,
        author: author,
        url: url,
        user: user
      }

      blogService.create(createdBlog)

      console.log('created new blog')

      setNotificationMessage('a new blog' + title + ' added')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
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

  const createForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        <h2>create new</h2>
        <div>
          title:
          <input
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          /></div>
        <div>
          url:
          <input
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          /></div>
        <button type="submit">create</button>
      </div>
    </form>
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>log in to application</h2>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
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

      {createForm()}

      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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