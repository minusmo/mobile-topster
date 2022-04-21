import "./subComponentStyles/gridCellStyle.css";
type GridCellProps = {
  topsterType: string;
  imgSrc: string;
  rowIndex: number;
  colIndex: number;
  clickHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const GridCell = ({
  topsterType,
  imgSrc,
  rowIndex,
  colIndex,
  clickHandler,
}: GridCellProps): JSX.Element => {
  return (
    <div className={topsterType === "top42" ? "gridCell42" : "gridCell"}>
      <div
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
        id={`${rowIndex}-${colIndex}`}
        onClick={clickHandler}
      ></div>
    </div>
  );
};

export default GridCell;
