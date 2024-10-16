const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");

const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test.only("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.statusCode, 200);
  assert.match(response.headers["content-type"], /application\/json/);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
