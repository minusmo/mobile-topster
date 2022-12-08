import { Button } from "../../../components/Button";
import { CountrySelection } from "./CountrySelection";

type PSearchForm = {
  onSubmission: () => Promise<void>;
  setCountry: (country: string) => void;
  setSearchInput: (searchInput: String) => void;
};

type searchInputProps = {
  setSearchInput: (searchInput: String) => void;
};

const SearchInput = ({ setSearchInput }: searchInputProps): JSX.Element => {
  return (
    <div className="">
      <label
        className=""
        htmlFor="search-album"
      >
        Artist/AlbumTitle
      </label>
      <div className="">
        <input
          id="search-album"
          className=""
          type="text"
          placeholder="type artist or album title"
          onChange={(e) => setSearchInput(String(e.currentTarget.value))}
        />
      </div>
    </div>
  );
};

const SearchForm = ({
  onSubmission,
  setCountry,
  setSearchInput,
}: PSearchForm): JSX.Element => {
  return (
    <div id="spotifySearchForm" className="">
      <CountrySelection setCountry={setCountry} />
      <div className="">
        <SearchInput setSearchInput={setSearchInput} />
      </div>
      <Button label={"Search"} onClick={onSubmission} />
    </div>
  );
};

export default SearchForm;
