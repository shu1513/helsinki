import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import NewBlog from "./components/NewBlog";
import Logout from "./components/Logout";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const createBlog = async (blogObject) => {
    await blogService.create(blogObject);
    setSuccessMessage(
      `a new blog ${blogObject.title} by ${blogObject.author} added`
    );
    blogFormRef.current.toggleVisibility();
    const blogs = await blogService.getAll();
    setBlogs(blogs);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const deleteBlog = async (blogObject) => {
    const confirmDelete = window.confirm(
      `Delete ${blogObject.title} by ${blogObject.author}?`
    );
    if (confirmDelete) {
      await blogService.deleteBlog(blogObject);
      setSuccessMessage(
        `The blog ${blogObject.title} by ${blogObject.author} has be deleted.`
      );
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    }
  };

  const sortedBlogs = blogs.sort((blogA, blogB) => blogB.likes - blogA.likes);

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} className={"error"} />
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={successMessage} className={"success"} />
        <p>{user.name} is logged in</p>
        <Logout text={"logout"} setUser={setUser} />
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <NewBlog createBlog={createBlog} />
        </Togglable>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={blogService.update}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
    );
  }
};
export default App;
