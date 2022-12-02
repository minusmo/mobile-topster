import SettingsButton from "../subComponents/SettingsButton";
import Settings from "../subComponents/Settings";
type settingsAccordionProps = {
  showPreferences: boolean;
  showAlbumTitle: boolean;
  setShowAlbumTitle: (showAlbumTitle: boolean) => void;
};

const SettingsAccordion = ({
  showPreferences,
  showAlbumTitle,
  setShowAlbumTitle,
}: settingsAccordionProps): JSX.Element => {
  return (
    <details data-uk-accordion>
      <SettingsButton />
      <div className="uk-accordion-content">
        <Settings
          showPreferences={showPreferences}
          showAlbumTitle={showAlbumTitle}
          setShowAlbumTitle={setShowAlbumTitle}
        />
      </div>
    </details>
  );
};

export default SettingsAccordion;
