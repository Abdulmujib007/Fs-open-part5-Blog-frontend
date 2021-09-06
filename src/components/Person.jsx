import Toggleable from "./Toggleable";
import Show from "./Show";

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
  handleRemove
}) => {
  const blog = allBlog.filter(
    (item) => (item.user.id || item.user) === user.id
  );
  return (
    <div>
      <h2>{user.username} logged in</h2>
      <form onSubmit={logOut}>
        <button type="submit">logOut</button>
      </form>
      <Toggleable text="create new Blog">
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
          <div style={{ border: "1px solid black", marginTop: "5px" }}>
            <span key={`blog${blogInd}`}>{blog.title}</span>
            <Show>
              <span key={`url${blogInd}`}>{blog.url}{blog.id}</span>
              <br />
              <span key={`author${blogInd}`}>
                likes {blog.likes} {<button onClick={() => handlelike(blog.id)}>likes</button>}
              </span>{" "}
              <br />
              <span key={`likes${blogInd}`}>{blog.author}</span><br/>
              <button onClick={() => handleRemove(blog.id)}>remove</button>
            </Show>
          </div>
        );
      })}
    </div>
  );
};

export default Person;
