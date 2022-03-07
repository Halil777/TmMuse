import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconName, IoMdClose } from "react-icons/io";
import { axiosInstanse } from '../../../utils/axiosInstanse';
import './delete.css'
import { ToastContainer, toast } from 'react-toastify';
import { Stack } from '@mui/material';


const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  borderRadius: '8px',
  bgcolor: 'background.paper',
  border: 'transparent',
  boxShadow: 24,
  p: 4,
};

const DeleteBanner = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {props.handleClose()}


  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };

  const deleteBanner = () => {
    axiosInstanse.delete('/delete-banner?id=' + props.bannerId, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Error");
        } else {
          if (response.data.body == 'DELETED') {
            handleClose();
            props.getData(1);
            toast.warn('Successfully deleted!', {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
      

          }
        }
      })
      .catch(ex => {
        alert(ex);
      });
  }
  return <div>
    <img onClick={handleOpen} src="images/Delete.svg" alt="" />
   
      <Fade in={true}>
        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='deletetitLe'>Do you want delete?</p>
            <IoMdClose onClick={handleClose} className='close' />
          </Stack>
          <Stack direction='row' spacing={3} marginLeft={30} marginTop={3}>
            <button onClick={handleClose} id='noButton'>No</button>
            <button id='yesButton' onClick={deleteBanner}>YES</button>
          </Stack>
        </Box>
      </Fade>
      <ToastContainer />
  </div>;
};

export default DeleteBanner;
