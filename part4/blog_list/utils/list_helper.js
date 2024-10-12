const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogsArray) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };
  return blogsArray.reduce(reducer, 0);
};

module.exports = {
  totalLikes,
  dummy,
};
