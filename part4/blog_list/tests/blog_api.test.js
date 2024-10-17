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
    id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  });
});

test("unique identifier is named id with non-existing blog", async () => {
  await api.get("/api/blogs/aa422a851b54a676234d17f7").expect(404);
});

test("able to post a blog", async () => {
  const newblog = {
    title: "Add sample",
    author: "Add sample author",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 15,
  };
  await api
    .post("/api/blogs")
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((b) => b.author);
  assert(contents.includes("Add sample author"));
});

test("likes property set to zero if not provided ", async () => {
  const newblog = {
    title: "Add sample",
    author: "Add sample author",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
  };
  const response = await api
    .post("/api/blogs")
    .send(newblog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  console.log("blog added");
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
  const contents = blogsAtEnd.map((b) => b.author);
  assert(contents.includes("Add sample author"));
  assert.strictEqual(response.body.likes, 0);
});

test("un able to post a blog without a title or URL", async () => {
  const blogWithoutTitle = {
    author: "Add sample author",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 15,
  };
  const blogWithoutURL = {
    title: "Add sample",
    author: "Add sample author",
  };
  await api.post("/api/blogs").send(blogWithoutTitle).expect(400);
  await api.post("/api/blogs").send(blogWithoutURL).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
  const contents = blogsAtEnd.map((b) => b.author);
  assert(!contents.includes("Add sample author"));
});

test("success delet blog status code 204 if valid", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1);
  const contents = blogsAtEnd.map((b) => b.title);

  assert(!contents.includes(blogToDelete.title));
});

test("can update a blog", async () => {
  const blogsAtStart = await helper.blogsInDb();

  const blogToChange = blogsAtStart[0];

  const newblog = { ...blogToChange, likes: 20 };

  const response = await api
    .put(`/api/blogs/${blogToChange.id}`)
    .send(newblog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.deepStrictEqual(response.body, newblog);

  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length);
  const contents = blogsAtEnd.map((b) => b.likes);
  assert(contents.includes(20));
  const updatedBlogFound = blogsAtEnd.find(
    (blog) => blog.id === blogToChange.id
  );
  assert.strictEqual(updatedBlogFound.likes, 20);
});

after(async () => {
  await mongoose.connection.close();
});
