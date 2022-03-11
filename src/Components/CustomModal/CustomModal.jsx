import { useState } from 'react';
import { Backdrop, Box, Fade, Modal, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const CustomModal = ({ open, handleClose, url }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <video autoPlay>
            <source src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" type="video/mp4" />
          </video>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;
