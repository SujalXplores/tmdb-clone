import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Slide,
} from '@mui/material';
import { forwardRef } from 'react';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export const LogoutDialog = ({ open, handleClose, logout }) => {
  
  const onEscClose = (e) => {
    if (e.keyCode === 27) {
      handleClose();
    }
  };

  const onConfirm = () => {
    logout();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onKeyDown={onEscClose}
    >
      <DialogTitle>Confirm Logout</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color='error'>
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};