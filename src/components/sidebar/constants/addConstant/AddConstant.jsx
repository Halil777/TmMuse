import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
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

const AddConstant = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [titleTM, setTitleTM] = useState('');
  const [titleRU, setTitleRU] = useState('');
  const [contentTM, setContentTm] = useState('');
  const [contentRU, setContentRU] = useState('');
  const [type, setType] = useState('');

  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }




async function addPost() {
  if (!toAdd)
    return;
    if (titleTM == '' || titleRU == '' || contentTM == '' || contentRU == '' ) {
      alert("Please enter required informations!")
      return;
    }



    const constant = {
      titleTM: titleTM,
      titleRU: titleRU,
      contentTM: contentTM,
      contentRU: contentRU,
      type: type
    };


    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    await axiosInstanse.post('/add-constant', constant, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        }
        alert("success")
        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        alert("Adding error:" + ex);
      });
  }



  useEffect(() => {

    addPost();
  }, [toAdd]);



  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{marginTop: '10px', width: '150px'}}>+ Add constant</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Row>
          <Col lg={3} md={4} xs={4} sm={4}>
            <p style={{color: '#7C057B', fontWeight: '600', fontSize: "20px" }}>Add constant</p>
          </Col>
          <Col lg={6} md={4} xs={4} sm={4}></Col>
          <Col lg={3} md={4} xs={4} sm={4}>
            <IoMdClose style={{marginLeft: '220px'}} onClick={handleClose}/>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title tm:</p>
              <input type="text" value={titleTM} onInput={e => setTitleTM(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title ru:</p>
              <input type="text" value={titleRU} onInput={e => setTitleRU(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content tm:</p>
              <textarea name="" id="" cols="30" rows="10" value={contentTM} onInput={e => setContentTm(e.target.value)}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content ru:</p>
              <textarea name="" id="" cols="30" rows="10" value={contentRU} onInput={e => setContentRU(e.target.value)}></textarea>
            </Stack>
          </Col>
          <Col lg={3} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Type:(about privacy)</p>
              <input type="text" value={type} onInput={e => setType(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={9} md={9} xs={9} sm={9}></Col>
          <Col lg={9} md={6} xs={6} sm={6}></Col>
          <Col lg={3} md={6} xs={6} sm={6} >
            <button onClick={handleAdd} style={{width: '130px',marginLeft:'115px', height: '33px', background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', borderRadius: '6px', border: 'transparent', color: 'white'}} >Add</button>
          </Col>
        </Row>
      </Box>
    </Modal>
  </div>;
};

export default AddConstant;
