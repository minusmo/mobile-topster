import React from "react";
type ButtonEventHandler = () => void;
type ControlButtonProps = {
  handleShowOptions: ButtonEventHandler;
  handleSave: ButtonEventHandler;
};
const ControlButtons = ({
  handleShowOptions,
  handleSave,
}: ControlButtonProps): JSX.Element => {
  return (
    <div id="controlButtons">
      <button onClick={handleShowOptions}>Options</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default ControlButtons;
