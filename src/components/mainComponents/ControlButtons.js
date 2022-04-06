import React from "react";

function ControlButtons({handleShowOptions, handleSave}) {
    return (
        <div id="controlButtons">
            <button onClick={handleShowOptions}>Options</button>
            <button onClick={handleSave}>Save</button>
        </div>
    )
}

export default ControlButtons;