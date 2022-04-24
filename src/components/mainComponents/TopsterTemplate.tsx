import React from "react";
import * as _ from "lodash";
import { Grid } from "../../models/modelTypes";
import GridCell from "../subComponents/GridCell";
import "./mainComponentStyles/topsterTemplateStyle.css";

type TopsterTemplateProps = {
  rows: number;
  cols: number;
  topsterType: string;
  topster: Grid;
  backgroundColor: string;
  handleClickGridcell: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type gridContainerStyle = {
  backgroundColor: string;
  height?: string;
  gridTemplateRows?: string;
  gridTemplateColumns?: string;
};

const setGridContainerStyle = (
  topsterType: string,
  backgroundColor: string,
  rows: number,
  cols: number
): gridContainerStyle => {
  let gridContainerStyle: gridContainerStyle;
  if (topsterType === "top42") {
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      height: "92vw",
    };
  } else {
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      gridTemplateColumns: `repeat(${cols}, calc(95vw / ${cols}))`,
      gridTemplateRows: `repeat(${rows}, calc(95vw / ${cols}))`,
    };
  }
  return gridContainerStyle;
};

const setGridContainerClass = (topsterType: string): string => {
  return topsterType === "top42" ? "gridContainer-42" : "gridContainer-grid";
};

const TopsterTemplate = ({
  rows,
  cols,
  topsterType,
  topster,
  backgroundColor,
  handleClickGridcell,
}: TopsterTemplateProps): JSX.Element => {
  let gridContainerStyle: gridContainerStyle;
  let gridContainerClass: string;
  gridContainerStyle = setGridContainerStyle(
    topsterType,
    backgroundColor,
    rows,
    cols
  );
  gridContainerClass = setGridContainerClass(topsterType);
  gridContainerClass = gridContainerClass + " uk-border-rounded";
  return (
    <div
      id="gridContainer"
      className={gridContainerClass}
      style={gridContainerStyle}
    >
      {topster.slice(0, rows).map((row, rowIndex) => {
        return row.slice(0, cols).map((tile, colIndex) => {
          return (
            <GridCell
              key={_.uniqueId()}
              topsterType={topsterType}
              imgSrc={tile.src}
              rowIndex={rowIndex}
              colIndex={colIndex}
              clickHandler={handleClickGridcell}
            />
          );
        });
      })}
    </div>
  );
};

export default TopsterTemplate;
