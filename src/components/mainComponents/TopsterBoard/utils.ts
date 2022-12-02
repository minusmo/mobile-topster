import { Grid } from "../../../models/modelTypes";

export type TopsterBoardProps = {
    cellClickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
    showAlbumTitles: boolean;
    currentWidth: number | undefined;
  };
  
export  type gridContainerStyle = {
    backgroundColor: string;
    height?: string;
    gridBoardRows?: string;
    gridBoardColumns?: string;
  };
  
export const setGridContainerStyle = (
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
        gridBoardRows: `repeat(28, calc(${currentWidth}px / 30))`,
      };
    } else {
      gridContainerStyle = {
        backgroundColor: backgroundColor,
        gridBoardColumns: `repeat(${cols}, calc(100% / ${cols}))`,
        gridBoardRows: `repeat(${rows}, calc(${currentWidth}px / ${cols}))`,
      };
    }
    return gridContainerStyle;
  };
  
export  const setGridContainerClass = (topsterType: string): string => {
    return topsterType === "top42" ? "grid-container top42" : "grid-container";
};