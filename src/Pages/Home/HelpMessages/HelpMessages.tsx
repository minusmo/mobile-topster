import Help from "./Help";
import { HelpFAB } from "./HelpFAB";

type IHelpMessages = {
  setShowHelpMessages: (showHelpMessages: boolean) => void;
}

const HelpMessages = ({
  setShowHelpMessages,
}: IHelpMessages) => {
  return (
    <div>
      <HelpFAB setShowHelpMesages={setShowHelpMessages}/>
      <Help classname={""} />
    </div>
  );
}

export default HelpMessages;
