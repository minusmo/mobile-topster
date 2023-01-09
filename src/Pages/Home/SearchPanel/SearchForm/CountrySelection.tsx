import { TextField } from "@mui/material";
import { COUNTRY_CODES, CountryCode } from "./countryCodes";

interface ICountrySelection {
  setCountry: (query?: string, country?: string) => void;
};

export const CountrySelection = ({
  setCountry,
}: ICountrySelection): JSX.Element => {
  return (
    <div>
      <TextField
        select
        id={'select-country'}
        label={'Search Location'}
        helperText={'Select a search location'}
        defaultValue={'US'}
        SelectProps={{
          native: true
        }}
        sx={{
          width: '100%',
          fontSize: '1rem',
        }}
        onChange={(e) => {setCountry(undefined, e.target.value)}}
      >
        {COUNTRY_CODES.map((countryCode: CountryCode) => (
          <option
            key={countryCode.name}
            value={countryCode.alpha2Code}
          >
            {countryCode.name}
          </option>
        ))}
      </TextField>
    </div>
  );
};
