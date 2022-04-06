import React from "react";

export default ControlButtons = ({
  handleShowOptions,
  handleSave,
}): React.Component => {
  return (
    <div id="controlButtons">
      <button onClick={handleShowOptions}>Options</button>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};
