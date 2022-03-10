import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';


export const Spinner = (open) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={open}
  >
    <CircularProgress color='primary' variant='indeterminate' />
  </Backdrop>
);

Spinner.propTypes = {
  open: PropTypes.bool,
};

Spinner.defaultProps = {
  open: true,
};