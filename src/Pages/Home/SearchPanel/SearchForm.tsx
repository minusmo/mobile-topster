import { TextButton } from "../../../components/TextButton";
import { CountrySelection } from "./CountrySelection";

type ISearchForm = {
  onSubmission: () => Promise<void>;
  setCountry: (country: string) => void;
  setSearchInput: (searchInput: String) => void;
};

type ISearchInput = {
  setSearchInput: (searchInput: String) => void;
};

const SearchInput = ({ setSearchInput }: ISearchInput): JSX.Element => {
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
}: ISearchForm): JSX.Element => {
  return (
    <div id="spotifySearchForm" className="">
      <CountrySelection setCountry={setCountry} />
      <div className="">
        <SearchInput setSearchInput={setSearchInput} />
      </div>
      <TextButton label={"Search"} onClick={onSubmission} />
    </div>
  );
};

export default SearchForm;
