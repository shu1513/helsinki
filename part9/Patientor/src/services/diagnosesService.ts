import diagnosesData from "../../data/diagnoses";

import { DiagnosesEntry } from "../types";

const diagnoses: DiagnosesEntry[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};
export default {
  getEntries,
};
