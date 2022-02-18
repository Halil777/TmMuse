import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const UpCons = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [titleTM, setTitleTM] = useState('');
  const [titleRU, setTitleRU] = useState('');
  const [contetntTM, setContentTm] = useState('');
  const [contentRU, setContentRU] = useState('');
  const [type, stType] = useState('');






  return <div>
    <img src="images/Edit.svg" onClick={handleOpen} alt="" />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Row>
          <Col lg={3} md={4} xs={4} sm={4}>
            <p style={{color: '#7C057B', fontWeight: '600', fontSize: "20px" }}>Update constant</p>
          </Col>
          <Col lg={6} md={4} xs={4} sm={4}></Col>
          <Col lg={3} md={4} xs={4} sm={4}>
            <IoMdClose style={{marginLeft: '220px'}} onClick={handleClose}/>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title tm:</p>
              <input type="text"></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title ru:</p>
              <input type="text"></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content tm:</p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content ru:</p>
              <textarea name="" id="" cols="30" rows="10"></textarea>
            </Stack>
          </Col>
          <Col lg={3} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Type:(about privacy)</p>
              <input type="text"></input>
            </Stack>
          </Col>
          <Col lg={9} md={9} xs={9} sm={9}></Col>
          <Col lg={9} md={6} xs={6} sm={6}></Col>
          <Col lg={3} md={6} xs={6} sm={6} >
            <button style={{width: '130px',marginLeft:'115px', height: '33px', background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', borderRadius: '6px', border: 'transparent', color: 'white'}}>Add</button>
          </Col>
        </Row>
      </Box>
    </Modal>
  </div>;
};

export default UpCons;
