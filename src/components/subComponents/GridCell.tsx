import "./subComponentStyles/gridCellStyle.css";
type GridCellProps = {
  topsterType: string;
  imgSrc: string;
  rowIndex: number;
  colIndex: number;
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const setGridCellClass = (topsterType: string) => topsterType === "top42" ? "gridCell42" : "gridCell";
const GridCell = ({
  topsterType,
  imgSrc,
  rowIndex,
  colIndex,
  clickHandler,
}: GridCellProps): JSX.Element => {
  let gridCellClass = setGridCellClass(topsterType);
  return (
    <div className={gridCellClass}>
      <div
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
        id={`${rowIndex}-${colIndex}`}
        className={"uk-border-rounded"}
        onClick={clickHandler}
      ></div>
    </div>
  );
};

export default GridCell;
