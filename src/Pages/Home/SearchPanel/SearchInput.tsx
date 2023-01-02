import { TextField } from "@mui/material";

interface ISearchInput {
  setSearchInput: (searchInput?: string, country?: string) => void;
}
;
export const SearchInput = ({ setSearchInput }: ISearchInput): JSX.Element => {
  return (
    <TextField
      id={'textfield-search'}
      label={'Search'}
      helperText={'Type album title or artist here'}
      placeholder={'The Beatles'}
      onChange={(e) => { setSearchInput(e.currentTarget.value.toString()); }}
      sx={{
        width: '100%'
      }} />
  );
};
