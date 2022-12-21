import { AdjustmentsVerticalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type IPreferencesFAB = {
  showPreferences: () => void;
}

export const PreferencesFAB = ({
  showPreferences,
}: IPreferencesFAB) => {
  const [toggled, setToggled] = useState(false);
  return (
    <button onClick={() => { setToggled(!toggled); showPreferences();}}>
      {
        toggled ?
        <XCircleIcon />
        :
        <AdjustmentsVerticalIcon />
      }
    </button>
  );
};
