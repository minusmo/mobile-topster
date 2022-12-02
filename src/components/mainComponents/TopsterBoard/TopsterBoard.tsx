import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { TopsterBoardProps, gridContainerStyle, setGridContainerStyle, setGridContainerClass } from "./utils";
import { TopsterContext } from "../../../App";
import { Grid } from "../../subComponents/Grid/Grid";
import { Top42 } from "../../subComponents/Top42/Top42";
import AlbumTitles from "../AlbumTitles/AlbumTitles";
import "./mainComponentStyles/topsterBoardStyle.css";

const TopsterBoard = observer(({
  showAlbumTitles,
  currentWidth,
}: TopsterBoardProps): JSX.Element => {
  const topster = useContext(TopsterContext);
  const albums = topster.getAlbums();

  let gridContainerStyle: gridContainerStyle;
  let gridContainerClass: string;

  gridContainerStyle = setGridContainerStyle(
    topster.type,
    topster.backgroundColor,
    topster.rows,
    topster.cols,
    currentWidth
  );

  gridContainerClass = setGridContainerClass(topster.type);
  gridContainerClass = gridContainerClass + " border-rounded";

  return (
    <div id="screenshot-area">
      <div
      id="grid-container"
      className={gridContainerClass}
      style={gridContainerStyle}
      >
      { 
        topster.type === "Grid" ?
        <Grid rows={topster.rows} albums={albums} /> 
        :
        <Top42 albums={albums}/>  
      }
      </div>
      {showAlbumTitles ? <AlbumTitles albums={albums} borderRoundness={topster.borderRoundness}/> : null}
    </div>
  );
});

export default TopsterBoard;
