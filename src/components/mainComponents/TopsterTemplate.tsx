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
  isRoundedBorder: boolean;
  currentWidth: number | undefined;
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
  cols: number,
  currentWidth: number | undefined
): gridContainerStyle => {
  let gridContainerStyle: gridContainerStyle;
  if (topsterType === "top42") {
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      gridTemplateRows: `repeat(28, calc(${currentWidth}px / 30))`,
    };
  } else {
    gridContainerStyle = {
      backgroundColor: backgroundColor,
      gridTemplateColumns: `repeat(${cols}, calc(100% / ${cols}))`,
      gridTemplateRows: `repeat(${rows}, calc(${currentWidth}px / ${cols}))`,
    };
  }
  return gridContainerStyle;
};

const setGridContainerClass = (topsterType: string): string => {
  return topsterType === "top42" ? "grid-container top42" : "grid-container";
};

const TopsterTemplate = ({
  rows,
  cols,
  topsterType,
  topster,
  backgroundColor,
  handleClickGridcell,
  isRoundedBorder,
  currentWidth,
}: TopsterTemplateProps): JSX.Element => {
  let gridContainerStyle: gridContainerStyle;
  let gridContainerClass: string;
  gridContainerStyle = setGridContainerStyle(
    topsterType,
    backgroundColor,
    rows,
    cols,
    currentWidth
  );
  gridContainerClass = setGridContainerClass(topsterType);
  gridContainerClass = gridContainerClass + " border-rounded";
  return (
    <div
      id="grid-container"
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
              isRoundedBorder={isRoundedBorder}
            />
          );
        });
      })}
    </div>
  );
};

export default TopsterTemplate;
