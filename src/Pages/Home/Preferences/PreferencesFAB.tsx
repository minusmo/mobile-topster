import { AdjustmentsVerticalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type IPreferencesFAB = {
  togglePreferences: () => void;
}

export const PreferencesFAB = ({
  togglePreferences,
}: IPreferencesFAB) => {
  const [toggled, setToggled] = useState(false);
  return (
    <button onClick={() => { setToggled(!toggled); togglePreferences();}}>
      {
        toggled ?
        <XCircleIcon />
        :
        <AdjustmentsVerticalIcon />
      }
    </button>
  );
};
