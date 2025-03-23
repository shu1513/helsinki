import axios from "axios";
import { Note, NewNote } from "./types";

const baseURL = "http://localhost:3001/notes";

export const getAllNotes = () => {
  return axios.get<Note[]>(baseURL).then((response) => response.data);
};

export const createNote = (object: NewNote) => {
  return axios.post<Note>(baseURL, object).then((response) => response.data);
};
