const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  let counter = await redis.getAsync("counter");
  counter = parseInt(counter) || 0;

  await redis.setAsync("counter", counter + 1);

  res.send(todo);
});

router.get("/statistics", async (req, res) => {
  try {
    let counter = await redis.getAsync("counter");
    counter = parseInt(counter) || 0;
    res.json({ added_todos: counter });
  } catch (error) {
    console.error("Error fetchin data", error);
    res.status(500).json({ error: "interal server error" });
  }
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  if (req.body.text) {
    req.todo.text = req.body.text;
  }
  if (req.body.done !== undefined) {
    req.todo.done = req.body.done;
  }
  await req.todo.save();
  res.send(req.todo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
