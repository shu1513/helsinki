const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//middleware to authenticate token
const verifyToken = (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  request.user = decodedToken;
  next();
};

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

blogsRouter.post("/", verifyToken, async (request, response, next) => {
  try {
    const user = await User.findById(request.user.id);
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

blogsRouter.delete("/:id", verifyToken, async (request, response) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", verifyToken, async (request, response, next) => {
  try {
    const body = request.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.user,
    };
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
