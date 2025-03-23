import { useState } from "react";
import { Entry } from "../../types";
import EntryForm from "./entryForm";
import CancelButton from "./cancelButton";

const AddEntry = ({ onAddEntry }: { onAddEntry: (newEntry: any) => void }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleClick = () => {
    setShowDiv(true);
    setShowButton(false);
  };

  const handleCancel = () => {
    setShowDiv(false);
    setShowButton(true);
  };

  return (
    <>
      {showDiv && (
        <>
          <EntryForm
            onAddEntry={onAddEntry}
            cancelButton={<CancelButton onCancel={handleCancel} />}
          />
        </>
      )}
      {showButton && <button onClick={handleClick}>Add Entry</button>}
    </>
  );
};

export default AddEntry;
