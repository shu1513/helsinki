import { useState, useContext } from "react";
import entryService from "../../services/entries";
import { PatientContext } from ".";
import {
  HealthCheckRating,
  HealthCheckEntryWithoutID,
  Entry,
} from "../../types";

const EntryForm = ({
  cancelButton,
  onAddEntry,
}: {
  cancelButton: React.ReactNode;
  onAddEntry: (newEntry: any) => void;
}) => {
  const [form, setForm] = useState<HealthCheckEntryWithoutID>({
    type: "HealthCheck",
    date: "",
    specialist: "",
    diagnosisCodes: [],
    description: "",
    healthCheckRating: HealthCheckRating.Healthy,
  });

  const patient = useContext(PatientContext);

  if (!patient) {
    return <div>Error: PatientContext not provided!</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "diagnosisCodes") {
      const diagnosisCodesArray = value.split(",").map((code) => code.trim());
      setForm((preForm) => ({
        ...preForm,
        diagnosisCodes: diagnosisCodesArray,
      }));
    } else {
      setForm((preForm) => ({ ...preForm, [name]: value }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newEntry = await entryService.create(patient.id, form);
      console.log(newEntry);
      console.log(newEntry.type);
      onAddEntry(newEntry); // Pass the new entry back to the parent component
      setForm({
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      });
    } catch (error) {
      console.error("Error adding entry:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="specialist">Specialist: </label>
          <input
            type="text"
            id="specialist"
            name="specialist"
            value={form.specialist}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="diagnosisCodes">Diagnosis Codes: </label>
          <input
            type="text"
            id="diagnosisCodes"
            name="diagnosisCodes"
            value={form.diagnosisCodes?.join(", ") || ""} // Fallback for safety
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="healthCheckRating">Health Check Rating: </label>
          <input
            type="number"
            id="healthCheckRating"
            name="healthCheckRating"
            value={form.healthCheckRating}
            onChange={handleInputChange}
            min={0}
            max={3}
            step={1}
            required
          />
        </div>
        <div>{cancelButton}</div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default EntryForm;
