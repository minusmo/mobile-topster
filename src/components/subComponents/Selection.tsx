import * as _ from "lodash";

type selectionProps = {
  valueLabel: string;
  value: number;
  onSelection: (val: number) => void;
};

export const Selection = ({ 
  valueLabel, 
  value, 
  onSelection 
}: selectionProps): JSX.Element => {
  const idxRange: number[] = _.range(0,11);
  return (
    <div className="">
      <label className="" htmlFor="select-rows">
        {valueLabel}
      </label>
      <div className="">
        <select
          value={value}
          className=""
          id="select-rows"
          onChange={(e) => onSelection(Number.parseInt(e.target.value))}
        >
          {idxRange.map((idx) => (
            <option key={_.uniqueId()} value={idx}>
              {idx}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};