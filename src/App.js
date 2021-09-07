import React, { useEffect, useState,useRef } from 'react'
import Fetch from './components/Fetch'
import Login from './components/Login'
import Person from './components/Person'
import Toggleable from './components/Toggleable'

const App = () => {
  const [allBlog, setAllBlog] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const blogRef = useRef()

  useEffect(() => {
    Fetch.getAllBlog().then((all) => {
      setAllBlog(all)
    })
  }, [])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedInUser')
    if (loggedUser) {
      const users = JSON.parse(loggedUser)
      setUser(users)
      Fetch.getToken(users.token)
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const loggeduser = await Fetch.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggeduser))
      Fetch.getToken(loggeduser.token)
      setUser(loggeduser)
      setUserName('')
      setPassword('')
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }
  const handleAddMore = async (e) => {
    e.preventDefault()
    blogRef.current.toggleVisibility()
    const newObj = {
      title,
      author,
      url,
    }
    try {
      const addedBlog = await Fetch.addmore(newObj)
      setAllBlog(allBlog.concat(addedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setError(`added ${addedBlog.title} by ${addedBlog.author} to blog list`)
      setTimeout(() => {
        setError('')
      }, 3000)
    } catch (exception) {
      console.log(exception)
    }
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
  }
  const handleUser = (e) => setUserName(e.target.value)
  const handlePass = (e) => setPassword(e.target.value)
  const handleTitle = (e) => setTitle(e.target.value)
  const handleAuthor = (e) => setAuthor(e.target.value)
  const handleUrl = (e) => setUrl(e.target.value)

  const handlelike = async (blogId) => {
    const blogToBeUpdated = allBlog.find((item) => item.id === blogId)
    blogToBeUpdated.likes += 1
    const newObj = {
      title: blogToBeUpdated.title,
      author: blogToBeUpdated.author,
      url: blogToBeUpdated.url,
      likes: blogToBeUpdated.likes,
    }
    const res = await Fetch.update(blogId, newObj)
    setAllBlog(allBlog.map((blog) => (blog.id !== res.id ? blog : res)))
  }
  const handleRemove = async (blogId) => {
    const removedBlog = allBlog.find((blog) => blog.id === blogId)
    if (
      window.confirm(
        `Remove blog ${removedBlog.title}! by ${removedBlog.author} `
      ) === true
    ) {
      await Fetch.remove(blogId)
      setAllBlog(allBlog.filter((blog) => blog.id !== blogId))
    }
  }

  return (
    <div>
      <p
        style={
          error
            ? {
              height: '2rem',
              borderRadius: '5px',
              background: 'gray',
              border: '2px solid green',
              color: 'green',
              fontSize: '1.25rem',
            }
            : {}
        }
      >
        {error}
      </p>
      {user === null ? (
        <Toggleable text="login">
          <Login
            handleSubmit={handleSubmit}
            handlePass={handlePass}
            handleUser={handleUser}
            username={username}
            password={password}
          />
        </Toggleable>
      ) : (
        <Person
          allBlog={allBlog}
          user={user}
          logOut={logOut}
          handleAddMore={handleAddMore}
          title={title}
          author={author}
          url={url}
          handleAuthor={handleAuthor}
          handleTitle={handleTitle}
          handleUrl={handleUrl}
          handlelike={handlelike}
          handleRemove={handleRemove}
          blogRef={blogRef}
        />
      )}
    </div>
  )
}

export default App
