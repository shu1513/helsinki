import axios from "axios";
import { Diary, NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<Diary[]>(baseUrl).then((response) => response.data);
};

export const createDiary = (object: NewDiary) => {
  return axios
    .post<Diary>(baseUrl, object)
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log(
          error.response?.data.error.map(
            (issue: { message: string }) => issue.message
          )
        );
        throw new Error(
          error.response?.data.error.map(
            (issue: { message: string }) => issue.message
          )
        );
      } else {
        throw new Error("an unexpected error occured");
      }
    });
};
