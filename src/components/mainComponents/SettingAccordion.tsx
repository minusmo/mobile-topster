import SettingsButton from "../subComponents/SettingsButton";
import Settings from "../subComponents/Settings";
type settingsAccordionProps = {
  showOptions: boolean;
  showAlbumTitle: boolean;
  setShowAlbumTitle: (showAlbumTitle: boolean) => void;
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  rows: number;
  setRows: (rows: number) => void;
  columns: number;
  setColumns: (cols: number) => void;
  updateTopster: (row: number, col: number, type: string) => void;
  isRoundedBorder: boolean;
  toggleBorder: () => void;
};

const SettingsAccordion = ({
  showOptions,
  showAlbumTitle,
  setShowAlbumTitle,
  backgroundColor,
  setBackgroundColor,
  rows,
  setRows,
  columns,
  setColumns,
  updateTopster,
  isRoundedBorder,
  toggleBorder
}: settingsAccordionProps): JSX.Element => {
  return (
    <details data-uk-accordion>
      <SettingsButton />
      <div className="uk-accordion-content">
        <Settings
          showOptions={showOptions}
          showAlbumTitle={showAlbumTitle}
          setShowAlbumTitle={setShowAlbumTitle}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          rows={rows}
          setRows={setRows}
          columns={columns}
          setColumns={setColumns}
          updateTopster={updateTopster}
          isRoundedBorder={isRoundedBorder}
          toggleBorder={toggleBorder}
        />
      </div>
    </details>
  );
};

export default SettingsAccordion;
