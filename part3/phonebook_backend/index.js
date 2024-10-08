require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("dist"));
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

let phoneNumbers = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  Person.find({}).then((people) => {
    const currentTime = new Date();
    response.send(
      `<p> Phonebook has info for ${people.length} people </p>
        <p>current time here ${currentTime}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((people) => {
      response.json(people);
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (!body.number || !body.name) {
    return response.status(400).json({
      error: "information missing",
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted ID" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
