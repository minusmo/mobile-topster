import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CountrySelection } from "./CountrySelection";

type ISearchForm = {
  onSubmission: () => void;
  setCountry: (country: string) => void;
  setQuery: (query: string) => void;
};

type ISearchInput = {
  setSearchInput: (searchInput: string) => void;
};

const SearchInput = ({ setSearchInput }: ISearchInput): JSX.Element => {
  return (
      <TextField
        id={'textfield-search'}
        label={'Search'}
        helperText={'Type album title or artist here'}
        defaultValue={'The Beatles'}
        onChange={(e) => setSearchInput(String(e.currentTarget.value))}
      />
  );
};

const SearchForm = ({
  onSubmission,
  setCountry,
  setQuery,
}: ISearchForm): JSX.Element => (
  <Box id="spotifySearchForm">
    <SearchInput setSearchInput={setQuery} />
    <CountrySelection setCountry={setCountry} />
    <Button
      type={'submit'}
      onClick={onSubmission}>
      Search
    </Button>
  </Box>
);

export default SearchForm;
