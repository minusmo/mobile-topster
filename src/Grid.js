import React, { useState } from "react";
import * as _ from "lodash";
import ReactGridLayout from "react-grid-layout";
import { set } from "lodash";

let xPoints = [];
for (let i = 0; i < 10; i++) {
  xPoints = _.concat(xPoints, _.range(10));
}
console.log(xPoints);
const yPoints = _.fill(Array(10), 0);
const layout = _.fill(Array(100), {
  i: _.uniqueId(),
  x: 0,
  y: 0,
  w: 1,
  h: 1,
});

for (let i = 0; i < 100; i++) {
  _.set(layout[i], "x", xPoints[i]);
  _.set(layout[i], "y", _.floor(i / 10));
}

const TopsterGrid = () => {
  const [cols, setCols] = useState(10);
  const [rows, setRows] = useState(10);
  const [rowHeight, setRowHeight] = useState(30);
  const [width, setWidth] = useState(1200);

  return (
    <ReactGridLayout
      layout={layout}
      className="layout"
      cols={cols}
      rowHeight={rowHeight}
      width={width}
      isResizable="false"
    >
      {_.map(layout, (cell) => (
        <div key={cell.i}>{cell.w}</div>
      ))}
    </ReactGridLayout>
  );
};

export default TopsterGrid;
