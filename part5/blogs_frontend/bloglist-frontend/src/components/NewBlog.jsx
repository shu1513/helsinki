import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ setSuccessMessage, setBlogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.create({
        title,
        author,
        url,
      });
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTitle("");
      setAuthor("");
      setUrl("");
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
    } catch (error) {
      throw error;
    }
  };

  const blogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );

  return (
    <>
      <h2>create new</h2>
      {blogForm()}
    </>
  );
};

export default NewBlog;
