import { CancelButtonProps } from "../../types";

const CancelButton = ({ onCancel }: CancelButtonProps) => {
  return (
    <button type="button" onClick={onCancel}>
      Cancel
    </button>
  );
};

export default CancelButton;
