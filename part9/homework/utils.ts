interface MultipleValuesExe {
  value1: number[];
  value2: number;
}

export const parseArgumentsExercise = (args: string[]): MultipleValuesExe => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const argsHours = args.slice(2);
  argsHours.forEach((element) => {
    if (isNaN(Number(element)) || Number(element) > 24 || Number(element) < 0) {
      throw new Error("arguments need to be valid number hours");
    }
  });
  const argsExeHourstxt = argsHours.slice(1);
  let argsExeHours: number[] = [];
  argsExeHourstxt.forEach((hours) => {
    argsExeHours.push(Number(hours));
  });
  return {
    value1: argsExeHours,
    value2: Number(argsHours[0]),
  };
};

interface MultipleValues {
  value1: number;
  value2: number;
}

export const parseArgumentsBmi = (args: string[]): MultipleValues => {
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
