const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response, next) => {
  console.log("starting get request on homepage");
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  console.log("starting get request on specific note");
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else response.status(404).end();
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...request.body,
      user: user.id,
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  console.log("request token is", request.token);
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  console.log("decoded token is", decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
    });

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
