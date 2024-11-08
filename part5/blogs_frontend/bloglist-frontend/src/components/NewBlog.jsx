import { useState } from "react";

const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          id="title-input"
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          id="author-input"
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          id="url-input"
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
