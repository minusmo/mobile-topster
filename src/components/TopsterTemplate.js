import React from "react";
import * as _ from "lodash";

function TopsterTemplate({
  rows,
  cols,
  topsterType,
  topster,
  backgroundColor,
  handleClickGridcell,
  showSearch,
}) {
  let gridContainerStyle;

  let gridContainerClass;
  if (topsterType === "top42") {
    gridContainerClass = "gridContainer-42";
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      height: "92vw",
    };
  } else {
    gridContainerClass = `gridContainer-grid`;
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      gridTemplateColumns: `repeat(${cols}, calc(95vw / ${cols}))`,
      gridTemplateRows: `repeat(${rows}, calc(95vw / ${cols}))`,
    };
  }

  return (
    <div
      id="gridContainer"
      className={gridContainerClass}
      style={gridContainerStyle}
    >
      {topster.slice(0, rows).map((row, rowIndex) => {
        return row.slice(0, cols).map((tile, colIndex) => {
          return (
            <div
              className={topsterType === "top42" ? "gridCell42" : "gridCell"}
              key={_.uniqueId()}
            >
              <div
                style={{
                  backgroundImage: `url(${tile.src})`,
                }}
                id={`${rowIndex}-${colIndex}`}
                onClick={handleClickGridcell}
              ></div>
            </div>
          );
        });
      })}
    </div>
  );
}

export default TopsterTemplate;
