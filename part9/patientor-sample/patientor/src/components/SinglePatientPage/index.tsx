import { useParams } from "react-router-dom";
import { Patient, Entry } from "../../types";
import EntryDetails from "./entryDetails";
import AddEntry from "./addEntry";
import { createContext, useState } from "react";

export const PatientContext = createContext<Patient | undefined>(undefined);

const SinglePatientPage = ({ patients }: { patients: Patient[] }) => {
  const id = String(useParams().id);
  const patient = patients.find((patient) => String(patient.id) === id);
  if (!patient) {
    return <div>patient not found</div>;
  }
  const [entries, setEntries] = useState(patient.entries);

  const handleAddEntry = (newEntry: any) => {
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };
  return (
    <>
      <h4>{patient.name}</h4>
      <div>date of birth: {patient.dateOfBirth}</div>
      <div>gender: {patient.gender}</div>
      <div>occupation: {patient.occupation}</div>
      <h4>entries</h4>
      <PatientContext.Provider value={patient}>
        <AddEntry onAddEntry={handleAddEntry} />
      </PatientContext.Provider>

      {entries.map((entry) => {
        return <EntryDetails key={entry.id} entry={entry} />;
      })}
    </>
  );
};

export default SinglePatientPage;
