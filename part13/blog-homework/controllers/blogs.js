const router = require("express").Router();

const { Blog } = require("../models");

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "SequelizeValidationError") {
    return response.status(400).json({ error: error.message });
  }

  if (error.name === "SequelizeUniqueConstraintError") {
    return response.status(400).json({ error: "Duplicate entry" });
  }

  if (error.name === "TypeError") {
    return response.status(400).json({ error: "Invalid data type" });
  }

  response.status(500).json({ error: "Internal server error" });
};

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();

    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

router.put("/:id", blogFinder, async (req, res) => {
  try {
    if (req.blog) {
      req.blog.likes = req.body.likes;
      await req.blog.save();
      res.json(req.blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
router.use(unknownEndpoint);

router.use(errorHandler);

module.exports = router;
