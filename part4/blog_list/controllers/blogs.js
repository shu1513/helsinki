const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
  console.log("starting get request on homepage");
  try {
    const blogs = await Blog.find({});

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
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
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
