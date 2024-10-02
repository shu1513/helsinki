const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://shu1513:${password}@cluster0.vnwvs.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: { type: String },
  number: { type: String },
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then((result) => {
    console.log(`added ${person.name} number ${person.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
