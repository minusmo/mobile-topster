import "./subComponentStyles/gridCellStyle.css";
type GridCellProps = {
  topsterType: string;
  imgSrc: string;
  rowIndex: number;
  colIndex: number;
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
  isRoundedBorder: boolean;
};

const setGridCellClass = (topsterType: string) =>
  topsterType === "top42" ? "gridCell top42" : "gridCell";

type gridCellStyle = {
  backgroundImage?: string;
  backgroundColor?: string;
};
const setGridCellStyle = (imgSrc: string): gridCellStyle => {
  let gridCellStyle: gridCellStyle = {};
  if (imgSrc) {
    gridCellStyle["backgroundImage"] = `url(${imgSrc})`;
  } else {
    gridCellStyle["backgroundColor"] = "white";
  }
  return gridCellStyle;
};
const GridCell = ({
  topsterType,
  imgSrc,
  rowIndex,
  colIndex,
  clickHandler,
  isRoundedBorder,
}: GridCellProps): JSX.Element => {
  const gridCellClass = setGridCellClass(topsterType);
  const gridCellStyle = setGridCellStyle(imgSrc);
  return (
    <div className={gridCellClass}>
      <div
        style={gridCellStyle}
        id={`${rowIndex}-${colIndex}`}
        className={isRoundedBorder ? "border-rounded" : ""}
        onClick={clickHandler}
      ></div>
    </div>
  );
};

export default GridCell;
