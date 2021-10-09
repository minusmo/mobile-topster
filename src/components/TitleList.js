import * as _ from "lodash";

const TitleListElement = ({ title, index }) =>
  title.length !== 0 ? <li>{title}</li> : null;

function TitleList({
  rows,
  cols,
  showAlbumTitle,
  topsterRows,
  backgroundColor,
}) {
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
            .map((tile, index) => (
              <TitleListElement title={tile.alt} key={_.uniqueId()} />
            ));
        })}
      </ul>
    </div>
  );
}

export default TitleList;
