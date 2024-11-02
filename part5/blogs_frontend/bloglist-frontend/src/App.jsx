import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import NewBlog from "./components/NewBlog";
import Logout from "./components/Logout";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  if (user === null) {
    return (
      <>
        <Notification message={errorMessage} className={"error"} />
        <Login setUser={setUser} setErrorMessage={setErrorMessage} />
      </>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} className={"success"} />
      <p>{user.name} is logged in</p>
      <Logout text={"logout"} setUser={setUser} />
      <NewBlog setSuccessMessage={setSuccessMessage} setBlogs={setBlogs} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
