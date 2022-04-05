import { Autocomplete, Box, TextField } from '@mui/material';
import { countries } from '../../Utils/countries';

export const CountryAutoComplete = () => {
  return (
    <Autocomplete
      sx={{
          background: '#e4e7eb',
          height: '34px'
      }}
      options={countries}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component='li'
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading='lazy'
            width='20'
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt={option.label}
          />
          {option.label + ' ' + option.code}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel
          defaultValue='IN'
          inputProps={{
            ...params.inputProps,
          }}
        />
      )}
    />
  );
};
