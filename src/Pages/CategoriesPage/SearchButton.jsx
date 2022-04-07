import { Button } from '@mui/material';

export default function SearchButton({ handleSearch }) {
  return (
    <Button
      variant='contained'
      fullWidth
      sx={{
        backgroundColor: '#01b4e4',
        height: '44px',
        borderRadius: '20px',
        fontSize: '1.2em',
        fontWeight: '600',
        fontFamily: 'inherit',
        mt: '7px',
        lineHeight: '1',
        '&:hover': {
          backgroundColor: '#032541',
        },
      }}
      onClick={handleSearch}
    >
      Search
    </Button>
  );
}
