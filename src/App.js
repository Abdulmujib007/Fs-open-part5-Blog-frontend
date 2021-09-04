import React, { useEffect, useState } from "react";
import Fetch from "./components/Fetch";

const App = () => {
  const [allBlog, setAllBlog] = useState([]);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    Fetch.getAllBlog().then((all) => {
      setAllBlog(all);
    });
  }, []);
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedInUser");
    if (loggedUser) {
      const users = JSON.parse(loggedUser);
      setUser(users);
      Fetch.getToken(users.token);
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loggeduser = await Fetch.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggeduser));
      Fetch.getToken(loggeduser.token);
      setUser(loggeduser);
      setUserName("");
      setPassword("");
    } catch (exception) {
      setError("Wrong credentials");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const handleAddMore = async (e) => {
    e.preventDefault()
    const newObj = {
      title,
      author,
      url,
    };
    try {
     const addedBlog =  await Fetch.addmore(newObj);
     setAllBlog(allBlog.concat(addedBlog))
      setTitle("");
      setAuthor("");
      setUrl("");
      setError(`added ${addedBlog.title} by ${addedBlog.author} to blog list`)
      setTimeout(() => {
        setError('')
      }, 3000);
    } catch (exception) {
      console.log(exception);
    }
  };
  const logOut = (e) => {
    window.localStorage.removeItem("loggedInUser");
  };

  const loginForm = () => {
    return (
      <>
        <h1>login to application</h1>
        <form onSubmit={handleSubmit}>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUserName(target.value)}
          />{" "}
          <br />
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const personBlogs = () => {
    const blog = allBlog.filter((item) => (item.user.id || item.user ) === user.id);
    return (
      <div>
        <h2>{user.username} logged in</h2>
        <form onSubmit={logOut}>
          <button type="submit">logOut</button>
        </form>
        <form onSubmit={handleAddMore}>
          <p>create blog</p>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
          <button type="submit">create</button>
        </form>
        <h3>Blogs</h3>
        {blog.map((blog, blogInd) => {
          return <p key={`blog${blogInd}`}>{blog.title}</p>;
        })}
      </div>
    );
  };

  return (
    <div>
      <p>{error}</p>
      {user === null ? loginForm() : personBlogs()}
    </div>
  );
};

export default App;
