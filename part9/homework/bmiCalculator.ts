import { parseArgumentsBmi } from "./utils";

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

if (require.main === module) {
  try {
    const { value1, value2 } = parseArgumentsBmi(process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error: unknown) {
    let errorMessage = "something went wrong. ";
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
}

export default calculateBmi;
