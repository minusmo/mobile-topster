const hideCol = (row, differ) => {
  const theRow = newAlbums[row];
  const toUpdate = _.takeRight(theRow.cols, differ);

  const updated = _.map(toUpdate, (each) => ({ ...each, hideCol: true }));
  const dropped = _.dropRight(theRow.cols, differ);

  const merged = _.concat(dropped, updated);
  newAlbums[row].cols = merged;
};

const showCol = (row, differ) => {
  const theRow = newAlbums[row];
  const toUpdate = _.take(theRow.cols, differ);

  const updated = _.map(toUpdate, (each) => ({ ...each, hideCol: false }));
  const dropped = _.drop(theRow.cols, differ);

  const merged = _.concat(updated, dropped);
  newAlbums[row].cols = merged;
};


const handleSetGrid = (curRows, curColumns) => {
    // console.log('handling set grid');

    let newAlbums = { ...albums };
    const showingColumns = newAlbums.row1.cols.filter(
      (album) => album.hideCol === false
    );  

    if (curColumns === showingColumns.length) {
    } else if (curColumns > showingColumns.length) {
      // 새로운 칼럼이 기존보다 더 많을 경우

      const diff = curColumns;
      showCol("row1", diff);
      showCol("row2", diff);
      showCol("row3", diff);
      showCol("row4", diff);
      showCol("row5", diff);
      showCol("row6", diff);
      showCol("row7", diff);
      showCol("row8", diff);
      showCol("row9", diff);
      showCol("row10", diff);
      console.log(newAlbums);
    } else {
      // 새로운 칼럼이 기존보다 더 적을 경우

      const diff = 10 - curColumns;
      console.log(albums);

      console.log(newAlbums);
      hideCol("row1", diff);
      hideCol("row2", diff);
      hideCol("row3", diff);
      hideCol("row4", diff);
      hideCol("row5", diff);
      hideCol("row6", diff);
      hideCol("row7", diff);
      hideCol("row8", diff);
      hideCol("row9", diff);
      hideCol("row10", diff);
      console.log(newAlbums);
    }
    // columns 조정이 끝난 후 row의 그리드를 수정
    const allRows = document.getElementsByClassName("row");
    const changeGridColumnNumber = (row) => {
      row.style.gridTemplateColumns = `repeat(${curColumns}, 1fr)`;
    };
    _.forEach(allRows, changeGridColumnNumber);

    console.log("handling rows");

    let count = 0;
    for (let row of Object.values(newAlbums)) {
      if (row.isHidden === false) {
        count += 1;
      }
    }

    console.log(count);
    console.log(curRows);

    if (curRows === count) {
    } else if (curRows > count) {
      // 새로운 로우가 기존보다 많을 경우
      Object.keys(newAlbums).forEach((key, index) => {
        if (index < curRows) {
          newAlbums[key].isHidden = false;
        }
      });
    } else {
      // 새로운 로우가 기존보다 적을 경우
      Object.keys(newAlbums).forEach((key, index) => {
        if (index >= curRows) {
          newAlbums[key].isHidden = true;
        }
      });
    }
    // 탑스터 컨테이너를 가져와서 row를 수정
    const newImgWidth = `${Math.floor(95 / curColumns)}%`;
    const topCon = document.getElementById("topCon");
    topCon.style.gridTemplateRows = `repeat(${curRows}, 1fr)`;
    const topHeight = Number.parseFloat(
      Number.parseInt(curRows) * Math.floor(95 / curColumns)
    );
    const newTopConHeight = `${topHeight}vw`;
    setTopConHeight(newTopConHeight);
    // console.log(newAlbums);
    setAlbums(newAlbums);

    // console.log(curColumns);
    // console.log(newImgWidth);
    setAlbumWidth(newImgWidth);
};

<div id="columnController">
<p>행별 개수 조절하기↓</p>
          <p style={{ fontSize: ".8em" }}>
            반드시 그리드 조절 후 해주시기 바랍니다.
          </p>
          <div
            className="columnControl"
            style={{
              width: "100vw",
              display: "grid",
              gridTemplateRows: "repeat(2, 1fr)",
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
          >
            <p>row1</p>
            <p>row2</p>
            <p>row3</p>
            <p>row4</p>
            <p>row5</p>
            <div>
              <input
                type="text"
                value={row1Cols}
                onChange={(e) => setRow1Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row2Cols}
                onChange={(e) => setRow2Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row3Cols}
                onChange={(e) => setRow3Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row4Cols}
                onChange={(e) => setRow4Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row5Cols}
                onChange={(e) => setRow5Cols(e.target.value)}
              />
            </div>
            <p>row6</p>
            <p>row7</p>
            <p>row8</p>
            <p>row9</p>
            <p>row10</p>
            <div>
              <input
                type="text"
                value={row6Cols}
                onChange={(e) => setRow6Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row7Cols}
                onChange={(e) => setRow7Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row8Cols}
                onChange={(e) => setRow8Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row9Cols}
                onChange={(e) => setRow9Cols(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={row10Cols}
                onChange={(e) => setRow10Cols(e.target.value)}
              />
            </div>

            </div>