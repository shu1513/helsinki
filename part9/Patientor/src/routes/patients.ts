import express, { Response } from "express";
import patientsServices from "../services/patientsService";
import { NonSensitivePatientEntry } from "../types";
import toNewPatientEntry from "../utils";
const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedEntry = patientsServices.addPatient(newPatientEntry);
  res.json(addedEntry);
});

export default router;
