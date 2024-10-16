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

test("blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.statusCode, 200);
  assert.match(response.headers["content-type"], /application\/json/);
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique identifier is named id with existing blog", async () => {
  const response = await api.get("/api/blogs/5a422a851b54a676234d17f7");
  assert.strictEqual(response.statusCode, 200);
  assert.match(response.headers["content-type"], /application\/json/);
  assert.deepStrictEqual(response.body, {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  });
});

test("unique identifier is named id with non-existing blog", async () => {
  await api.get("/api/blogs/aa422a851b54a676234d17f7").expect(404);
});

after(async () => {
  await mongoose.connection.close();
});
