import { Entry } from "../../types";

const EntryDetails: React.FC<{ entry: any }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <>
          <div>{entry.date}</div>
          <div>diagnosed by {entry.specialist}</div>
          {entry.diagnosisCodes && (
            <div>
              diagnoses codes:
              <ul>
                {entry.diagnosisCodes.map((code, index) => (
                  <li key={index}>{code}</li>
                ))}
              </ul>
            </div>
          )}
          <div>Hospital Entry: {entry.description}</div>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <div>{entry.date}</div>
          <div>diagnosed by {entry.specialist}</div>
          {entry.diagnosisCodes && (
            <div>
              diagnoses codes:
              <ul>
                {entry.diagnosisCodes.map((code, index) => (
                  <li key={index}>{code}</li>
                ))}
              </ul>
            </div>
          )}
          <div>Occupational Healthcare Entry: {entry.description}</div>
        </>
      );
    case "HealthCheck":
      return (
        <>
          <div>{entry.date}</div>
          <div>diagnosed by {entry.specialist}</div>
          {entry.diagnosisCodes && (
            <div>
              diganoses codes:
              <ul>
                {entry.diagnosisCodes.map((code, index) => (
                  <li key={index}>{code}</li>
                ))}
              </ul>
            </div>
          )}
          <div>Health Check Entry: {entry.description}</div>
        </>
      );
    default:
      const _exhaustiveCheck: never = entry;
      throw new Error(`Unhandled entry type: ${_exhaustiveCheck}`);
  }
};

export default EntryDetails;
