import { Button } from '@mui/material';
import { useElementOnScreen } from '../../Hooks/useElementOnScreen';

const SearchButton = ({ handleSearch }) => {
  const { elRef, isVisible } = useElementOnScreen({
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  const defaultStyle = {
    backgroundColor: '#01b4e4',
    height: '44px',
    borderRadius: '20px',
    fontSize: '1.2em',
    fontWeight: '600',
    mt: '7px',
    lineHeight: '1',
    '&:hover': {
      backgroundColor: '#032541',
    },
  };

  const fullWidthStyle = {
    backgroundColor: '#01b4e4',
    height: '50px',
    fontSize: '1.2em',
    fontWeight: '600',
    lineHeight: '1',
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    left: 0,
    borderRadius: 0,
    zIndex: 5,
    '&:hover': {
      backgroundColor: '#032541',
    },
  };

  return (
    <div ref={elRef}>
      {isVisible ? (
        <Button
          variant='contained'
          fullWidth
          sx={defaultStyle}
          onClick={handleSearch}
        >
          Search
        </Button>
      ) : (
        <Button
          variant='contained'
          fullWidth
          sx={fullWidthStyle}
          onClick={handleSearch}
        >
          Search
        </Button>
      )}
    </div>
  );
};

export default SearchButton;
