const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

const validatePhoneNumber = (number) => {
  // Regular expression to check phone number pattern
  const regex = /^(\d{2,3})-(\d+)$/;

  // Test if the phone number matches the pattern
  const result = regex.test(number);

  // Additionally, check the length of the number
  // Remove the '-' and check that the total length is 8 or more
  const withoutHyphen = number.replace("-", "");
  const lengthValid = withoutHyphen.length >= 8;

  return result && lengthValid;
};

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3 },
  number: {
    type: String,
    required: [true, "phone number required"],
    validate: {
      validator: validatePhoneNumber,
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
