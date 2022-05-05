const changeBlankCellsToDefaultBackground = (
  gridContainer: HTMLElement | null,
): void => {
  if (gridContainer) {
    for (let cell of Array.from(gridContainer.children)) {
      let innerDiv = cell.firstElementChild! as HTMLDivElement;
      if (!innerDiv.style.backgroundImage) {
        innerDiv.style.backgroundColor = "#fff";
      }
    }
  }
};

const changeBlankCellsToBackgroundColor = (
  gridContainer: HTMLElement | null,
  backgroundColor: string
): void => {
  if (gridContainer) {
    for (let cell of Array.from(gridContainer.children)) {
      let innerDiv = cell.firstElementChild! as HTMLDivElement;
      if (!innerDiv.style.backgroundImage) {
        innerDiv.style.backgroundColor = backgroundColor;
      }
      console.log(innerDiv);
    }
  }
};

const getGridContainerWidth = (gridContainer: HTMLElement | null): number => {
  if (!gridContainer) {
    return 0;
  }
  return gridContainer.clientWidth * 0.96;
};

export {
  changeBlankCellsToBackgroundColor,
  changeBlankCellsToDefaultBackground,
  getGridContainerWidth,
};
