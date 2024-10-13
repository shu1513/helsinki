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

const mostBlogs = (blogsArray) => {
  let publications = {};
  for (let i = 0; i < blogsArray.length; i++) {
    const author = blogsArray[i].author;
    if (publications[author]) {
      publications[author] += 1;
    } else {
      publications[author] = 1;
    }
  }
  let maxPublication = 0;
  let mostPublishedAuthor;
  for (author in publications) {
    if (publications[author] > maxPublication) {
      maxPublication = publications[author];
      mostPublishedAuthor = { author: author, blogs: publications[author] };
    }
  }
  return mostPublishedAuthor;
};

const mostLikes = (blogsArray) => {
  const reducer = (publications, blog) => {
    const author = blog.author;
    {
      publications[author] = (publications[author] || 0) + blog.likes;
    }
    return publications;
  };
  const authorLikes = blogsArray.reduce(reducer, {});
  let mostLikedAuthor = null;
  let maxLikes = -1;

  // Iterate over the object to find the author with the most likes
  for (const [author, likes] of Object.entries(authorLikes)) {
    if (likes > maxLikes) {
      mostLikedAuthor = author;
      maxLikes = likes;
    }
  }
  return { author: mostLikedAuthor, likes: maxLikes };
};

module.exports = {
  mostLikes,
  mostBlogs,
  favoriteBlog,
  totalLikes,
  dummy,
};
