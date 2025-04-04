import express from "express";
import calculateBmi from "./bmiCalculator";
import { calculatorExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || height <= 0 || weight <= 0) {
    res.status(400).json({
      error: "malformatted parameters",
    });
  } else {
    const response: string = calculateBmi(height, weight);
    res.json({ weight, height, bmi: response });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(404).json({
      error: "parameters missing",
    });
  } else if (isNaN(target)) {
    res.status(404).json({
      error: "malformatted parameters",
    });
  } else if (
    !Array.isArray(daily_exercises) ||
    !daily_exercises.every((e) => !isNaN(Number(e)))
  ) {
    res.status(404).json({
      error: "malformatted parameters",
    });
  }
  const response = calculatorExercises(
    daily_exercises as number[],
    target as number
  );
  res.json(response);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
