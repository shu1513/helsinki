interface MultipleValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): MultipleValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("arguments need to be numbers");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const BMI: number = weight / (height / 100) ** 2;

  if (BMI < 18.5) {
    return "underweight";
  } else if (18.5 <= BMI && BMI < 25) {
    return "norml";
  } else if (BMI >= 25) {
    return "fat";
  } else {
    throw new Error("invailid value received");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = "something went wrong. ";
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
