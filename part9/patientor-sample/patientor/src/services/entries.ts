import axios from "axios";
import { Entry, EntryWithoutId } from "../types";

import { apiBaseUrl } from "../constants";

const create = async (patientId: string, object: EntryWithoutId) => {
  const { data } = await axios.post<Entry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    object
  );

  return data;
};

export default {
  create,
};
