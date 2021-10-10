import { Topster } from "../models/Topster";

function Options({
  showOptions,
  showAlbumTitle,
  setShowAlbumTitle,
  backgroundColor,
  setBackgroundColor,
  rows,
  setRows,
  columns,
  setColumns,
  setTopster,
  updateTopster,
}) {
  return (
    <div id="options" style={{ display: showOptions }}>
      {/* 타이틀 숨김버튼 */}
      <input
        type="checkbox"
        checked={showAlbumTitle}
        onChange={(e) => setShowAlbumTitle(!showAlbumTitle)}
      />

      <label>SHOW ALBUM TITLES</label>
      <br></br>

      {/* 배경색 설정버튼 */}
      <label>BackgroundColor in #HEX: </label>
      <input
        type="text"
        placeholder="#HEX color"
        value={backgroundColor}
        onChange={(e) => setBackgroundColor(e.target.value)}
      />

      {/* <label>#HEX</label> */}
      <br></br>

      {/* row 설정 */}
      <label>ROWS</label>
      <input
        type="range"
        min="1"
        max="10"
        value={rows}
        onChange={(e) => {
          setRows(Number.parseInt(e.target.value));
          e.preventDefault();
        }}
      />
      <span>{rows}</span>
      <br></br>

      {/* columns 설정 */}
      <label>COLUMNS</label>
      <input
        type="range"
        min="1"
        max="10"
        value={columns}
        onChange={(e) => {
          setColumns(Number.parseInt(e.target.value));
          e.preventDefault();
        }}
      />
      <span>{columns}</span>
      <br></br>

      {/* 그리드설정버튼 */}
      <button
        onClick={(e) => {
          updateTopster(rows, columns, "grid");
          e.preventDefault();
        }}
      >
        SetGrid
      </button>

      {/* top42 설정버튼 */}
      <button
        onClick={(e) => {
          setRows(6);
          setColumns(7);
          updateTopster(6, 7, "top42");
          e.preventDefault();
        }}
      >
        Top42
      </button>
    </div>
  );
}

export default Options;
