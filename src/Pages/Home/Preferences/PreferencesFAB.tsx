import { AdjustmentsVerticalIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PPreferencesFAB = {
  setShowPreferences: (showPreference: boolean) => void;
}

export const PreferencesFAB = ({
  setShowPreferences,
}: PPreferencesFAB) => {
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
