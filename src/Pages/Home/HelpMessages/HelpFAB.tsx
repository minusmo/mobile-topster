import { InformationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type IHelpFAB = {
  setShowHelpMesages: (showHelpMessages: boolean) => void;
};

export const HelpFAB = ({
  setShowHelpMesages
}: IHelpFAB): JSX.Element => {
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
