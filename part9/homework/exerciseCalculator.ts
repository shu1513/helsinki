import { parseArgumentsExercise } from "./utils";

interface resultType {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculatorExercises = (
  exerciseHoursList: number[],
  targetHoursPerDay: number
): resultType => {
  const periodLength = exerciseHoursList.length;

  if (periodLength < 1) {
    throw new Error("need to give a least data for 1 day");
  }
  exerciseHoursList.forEach((hours) => {
    if (hours < 0 || hours > 24) {
      throw new Error("invalid hours");
    }
  });

  const trainingDays = exerciseHoursList.filter((hours) => hours !== 0).length;
  const target = targetHoursPerDay;
  const average =
    exerciseHoursList.reduce((total, num) => total + num) /
    exerciseHoursList.length;
  const success = average >= target;
  let ratingDescription = "";
  let rating: number;
  if (average >= target && average <= target * 1.2) {
    ratingDescription = "you have met the target";
    rating = 3;
  } else if (average >= target * 0.8) {
    ratingDescription = "you almost meet the target";
    rating = 2;
  } else if (average < target * 0.8) {
    rating = 1;
    ratingDescription = "you didn't meet the target";
  } else if (average > target * 1.2) {
    ratingDescription = "you have exceeded the target";
    rating = 3;
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { value1, value2 } = parseArgumentsExercise(process.argv);
  console.log(calculatorExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = "something went wrong. ";
  if (error instanceof Error) {
    errorMessage += errorMessage;
  }
  console.log(errorMessage);
}
