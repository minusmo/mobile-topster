import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import * as _ from "lodash";
import "./mainComponentStyles/topsterBoardStyle.css";
import { TopsterBoardProps, gridContainerStyle, setGridContainerStyle, setGridContainerClass } from "./utils";
import { TopsterContext } from "../../../App";
import { Grid } from "../../subComponents/Grid/Grid";
import { Top42 } from "../../subComponents/Top42/Top42";

export const TopsterBoard = observer(({
  rows,
  cols,
  topsterType,
  backgroundColor,
  handleClickGridcell,
  isRoundedBorder,
  currentWidth,
}: TopsterBoardProps): JSX.Element => {
  const topster = useContext(TopsterContext);
  const albums = topster.getAlbums();

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
    { topster.type === "Grid" ?
      <Grid rows={topster.rows} albums={albums} /> 
      :
      <Top42 albums={albums}/>  
    }
    </div>
  );
});

export default TopsterBoard;
