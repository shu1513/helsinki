import express, { Response } from "express";
import diagnosesServices from "../services/diagnosesService";
import { DiagnosesEntry } from "../types";
const router = express.Router();

router.get("/", (_req, res: Response<DiagnosesEntry[]>) => {
  res.send(diagnosesServices.getEntries());
});

export default router;
