import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { CountrySelection } from "./CountrySelection";
import Grid from "@mui/system/Unstable_Grid";
import { SearchInput } from "./SearchInput";

interface ISearchForm {
  onSubmission: () => void;
  onFormDataChange: (query?: string, country?: string) => void;
};

const SearchForm = ({
  onSubmission,
  onFormDataChange,
}: ISearchForm): JSX.Element => (
  <Grid container spacing={1} >
    <Grid xs={6}>
      <SearchInput setSearchInput={onFormDataChange} />
    </Grid>
    <Grid xs={6}>
      <CountrySelection setCountry={onFormDataChange} />
    </Grid>
    <Grid xs={12}>
      <Button
        variant={'contained'}
        type={'submit'}
        onClick={onSubmission}
        sx={{
          width: '100%'
        }}
      >
        Search
      </Button>
    </Grid>
  </Grid>
);

export default SearchForm;
