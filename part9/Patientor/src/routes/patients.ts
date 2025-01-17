import express, { NextFunction, Response, Request } from "express";
import patientsServices from "../services/patientsService";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientsEntry,
} from "../types";
import { NewEntrySchema } from "../utils";
const router = express.Router();
import { z } from "zod";

router.get("/", (_req, res: Response<NonSensitivePatientEntry[]>) => {
  res.send(patientsServices.getNonSensitiveEntries());
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatientEntry>,
    res: Response<PatientsEntry>
  ) => {
    const addedEntry = patientsServices.addPatient(req.body);
    res.json(addedEntry);
  }
);
router.use(errorMiddleware);
export default router;
