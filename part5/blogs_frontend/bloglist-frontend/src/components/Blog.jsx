import { useState } from "react";
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [blogVisible, setBlogVisible] = useState(false);
  const hideWhenVisible = blogVisible ? { display: "none" } : blogStyle;
  const showWhenVisible = blogVisible ? blogStyle : { display: "none" };

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const storedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser")
  );

  return (
    <div>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button>like</button>
        <br />
        {storedUser.name}
      </div>
    </div>
  );
};

export default Blog;
