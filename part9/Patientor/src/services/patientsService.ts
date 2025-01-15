import patientsData from "../../data/patients";
import { v1 as uuidv1 } from "uuid";

import {
  NonSensitivePatientEntry,
  PatientsEntry,
  NewPatientEntry,
} from "../types";

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
  const newPatientEntry = {
    id: uuidv1(),
    ...entry,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getNonSensitiveEntries,
  addPatient,
};
