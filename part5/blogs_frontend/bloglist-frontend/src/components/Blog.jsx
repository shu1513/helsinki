import { useState } from "react";
const Blog = ({ blog, updateBlog, deleteBlog }) => {
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
  const [likeCount, setLikeCount] = useState(blog.likes);

  const toggleVisibility = () => {
    setBlogVisible(!blogVisible);
  };

  const storedUser = JSON.parse(
    window.localStorage.getItem("loggedBlogappUser")
  );

  const handleUpdateBlog = async () => {
    const updatedLikes = likeCount + 1;
    setLikeCount(updatedLikes);
    const updatedBlog = { ...blog, likes: updatedLikes };
    console.log("Sending updated blog:", updatedBlog);

    try {
      await updateBlog(updatedBlog);
    } catch (error) {
      setLikeCount(likeCount);
      throw error;
    }
  };

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
        likes {likeCount} <button onClick={handleUpdateBlog}>like</button>
        <br />
        {storedUser.name}
        <br />
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
