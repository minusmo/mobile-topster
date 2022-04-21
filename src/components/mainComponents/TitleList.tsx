import * as _ from "lodash";
import { Grid } from "../../models/modelTypes";
import "./mainComponentStyles/titleListStyle.css";
type TitleListElementProps = {
  title: String;
};

type TitleListElementType = JSX.Element | null;

const TitleListElement = ({
  title,
}: TitleListElementProps): TitleListElementType => {
  return title.length !== 0 ? <li>{title}</li> : null;
};

type TitleListProps = {
  rows: number;
  cols: number;
  showAlbumTitle: boolean;
  topsterRows: Grid;
  backgroundColor: string;
};

const TitleList = ({
  rows,
  cols,
  showAlbumTitle,
  topsterRows,
  backgroundColor,
}: TitleListProps): JSX.Element => {
  return (
    <div
      id="titleList"
      className={showAlbumTitle ? "titleList-show" : "titleList-hidden"}
      style={{ backgroundColor: backgroundColor }}
    >
      <ul id="titleUnorderedlist">
        {topsterRows.slice(0, rows).map((row, index) => {
          return row
            .slice(0, cols)
            .map((cell, index) => (
              <TitleListElement title={cell.alt} key={_.uniqueId()} />
            ));
        })}
      </ul>
    </div>
  );
};

export default TitleList;
