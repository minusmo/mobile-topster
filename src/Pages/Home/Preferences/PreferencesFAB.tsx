import { AdjustmentsVerticalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type IPreferencesFAB = {
  setShowPreferences: (showPreference: boolean) => void;
}

export const PreferencesFAB = ({
  setShowPreferences,
}: IPreferencesFAB) => {
  const [toggled, setToggled] = useState(false);
  return (
    <button className="" onClick={() => { setToggled(!toggled); setShowPreferences(!toggled);}}>
      {
        toggled ?
        <XCircleIcon />
        :
        <AdjustmentsVerticalIcon />
      }
    </button>
  );
};
