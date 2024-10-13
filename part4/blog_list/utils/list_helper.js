const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogsArray) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogsArray.reduce(reducer, 0);
};

const favoriteBlog = (blogsArray) => {
  const reducer = (maxLikedBlog, currentblog) => {
    return maxLikedBlog.likes >= currentblog.likes ? maxLikedBlog : currentblog;
  };
  return blogsArray.reduce(reducer);
};

module.exports = {
  favoriteBlog,
  totalLikes,
  dummy,
};
