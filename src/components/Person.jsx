/* eslint-disable react/react-in-jsx-scope */
import Toggleable from './Toggleable'
import Show from './Show'
import PropTypes from 'prop-types'
// import { useRef } from "react";

const Person = ({
  allBlog,
  user,
  logOut,
  handleAddMore,
  title,
  url,
  author,
  handleTitle,
  handleAuthor,
  handleUrl,
  handlelike,
  handleRemove,
  blogRef
}) => {


  const blog = allBlog.filter(
    (item) => (item.user.id || item.user) === user.id
  )
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <h2>{user.username} logged in</h2>
      <form onSubmit={logOut}>
        <button type="submit">logOut</button>
      </form>
      <Toggleable text="create new Blog" ref={blogRef}>
        <form onSubmit={handleAddMore}>
          <p>create blog</p>
          title
          <input value={title} onChange={handleTitle} />
          <br />
          author
          <input value={author} onChange={handleAuthor} />
          <br />
          url
          <input value={url} onChange={handleUrl} />
          <button type="submit">create</button>
        </form>
      </Toggleable>
      <h3>Blogs</h3>
      {blog.map((blog, blogInd) => {
        return (
          <div key={`first ${blogInd}`}style={{ border: '1px solid black', marginTop: '5px' }}>
            <span key={`blog${blogInd}`}>{blog.title}</span>
            <Show>
              <span key={`url${blogInd}`}>{blog.url}</span>
              <br />
              <span key={`author${blogInd}`}>
                likes {blog.likes} {<button onClick={() => handlelike(blog.id)}>likes</button>}
              </span>{' '}
              <br />
              <span key={`likes${blogInd}`}>{blog.author}</span><br/>
              <button onClick={() => handleRemove(blog.id)}>remove</button>
            </Show>
          </div>
        )
      })}
    </div>
  )
}
Person.propTypes =  {
  allBlog: PropTypes.array.isRequired,
  user:PropTypes.object.isRequired,
  handleAddMore:PropTypes.func.isRequired,
  title:PropTypes.string.isRequired,
  url:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired,
  logOut:PropTypes.func.isRequired,
  handleTitle:PropTypes.func.isRequired,
  handleAuthor:PropTypes.func.isRequired,
  handleUrl:PropTypes.func.isRequired,
  handlelike:PropTypes.func.isRequired,
  handleRemove:PropTypes.func.isRequired
}

export default Person
