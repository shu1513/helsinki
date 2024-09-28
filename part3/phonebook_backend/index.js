const morgan = require("morgan");
const express = require("express");
const app = express();
const cors = require("cors");

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

app.get("/api/persons", (request, response) => {
  response.json(phoneNumbers);
});

app.get("/info", (request, response) => {
  const peopleCount = phoneNumbers.length;
  const currentTime = new Date();
  response.send(
    `<p> Phonebook has info for ${peopleCount} people </p>
        <p>current time here ${currentTime}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const person = phoneNumbers.find((person) => person.id === request.params.id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  phoneNumbers = phoneNumbers.filter(
    (person) => person.id !== request.params.id
  );
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.number || !person.name) {
    return response.status(400).json({
      error: "information missing",
    });
  } else if (phoneNumbers.find((p) => p.name === person.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  person.id = String(Math.random());
  phoneNumbers = phoneNumbers.concat(person);
  response.json(person);
  console.log(request.body);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
