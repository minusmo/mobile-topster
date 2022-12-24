import { Slider, SliderProps } from "@mui/material";
import React from "react";
import { TopsterType } from "../data/models/Topster";

type ISelectSlider = {
  onSelection: (val: number) => void;
  label: string;
  topsterType: TopsterType;
  sliderProps: SliderProps;
};

export const SelectSlider = ({ 
  onSelection,
  label,
  topsterType,
  sliderProps
}: ISelectSlider): JSX.Element => {
  return (
    <div>
      <label htmlFor={"select-rows"}>
        {label}
      </label>
      <Slider
        {...sliderProps}
        marks
        valueLabelDisplay={"auto"}
        step={1}
        defaultValue={10}
        min={1}
        max={10}
        disabled={topsterType === TopsterType.Grid ? false : true}
        onChangeCommitted={confirmSelection}
      />
    </div>
  );

  function confirmSelection(event: React.SyntheticEvent | Event, value: number | number[]) {
    const val = Array.isArray(value) ? value[0] : value;
    onSelection(val);
  }
};

