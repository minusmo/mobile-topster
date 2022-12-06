import Help from "./Help";
import { HelpFAB } from "./HelpFAB";

type PHelpMessages = {
  setShowHelpMessages: (showHelpMessages: boolean) => void;
}

const HelpMessages = ({
  setShowHelpMessages,
}: PHelpMessages) => {
  return (
    <div>
      <HelpFAB setShowHelpMesages={setShowHelpMessages}/>
      <Help classname={""} />
    </div>
  );
}

export default HelpMessages;
