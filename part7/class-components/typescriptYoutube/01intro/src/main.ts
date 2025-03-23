interface Student {
  [key: string]: string | number | number[];
  name: string;
  GPA: number;
}

const student: Student = {
  name: "Doug",
  GPA: 3.5,
  classes: [100, 200],
};

console.log(student.test);
