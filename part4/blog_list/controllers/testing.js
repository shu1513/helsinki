const router = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  console.log("Environment:", process.env.NODE_ENV);
  await Blog.deleteMany({});
  console.log("Blog collection cleared");
  await User.deleteMany({});
  console.log("User collection cleared");

  response.status(204).end();
});

module.exports = router;
