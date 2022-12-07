import { InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type PHelpFAB = {
  setShowHelpMesages: (showHelpMessages: boolean) => void;
};

export const HelpFAB = ({
  setShowHelpMesages
}: PHelpFAB): JSX.Element => {
  const [toggled, setToggled] = useState(false);
  return (
    <button onClick={() => { setToggled(!toggled); setShowHelpMesages(!toggled); }}>
      {
      toggled ?
      <XCircleIcon />
      :
      <InformationCircleIcon />
      }
    </button>
  );
};
