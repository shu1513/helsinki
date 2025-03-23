type Operations = "multiply" | "add" | "divide";

const args = process.argv.slice(2);
const a = parseFloat(args[0]);
const b = parseFloat(args[1]);
const operation = args[2] as Operations;

export const calculator = (a: number, b: number, operation: Operations) => {
  switch (operation) {
    case "multiply":
      console.log(a * b);
      break;
    case "add":
      console.log(a + b);
      break;
    case "divide":
      console.log(a / b);
      break;
    default:
      const exhaustiveCheck: never = operation;
      throw new Error(`Unsupported operation: ${exhaustiveCheck}`);
  }
};
calculator(a, b, operation);
