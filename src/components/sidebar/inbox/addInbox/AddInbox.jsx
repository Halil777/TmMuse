import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const AddInbox = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ user_id, setUser_id ] = useState(0);
    const [allUser, setAllUser] = useState([]);
    const [ title, setTitle ] = useState([]);
    const [ message, setMessage ] = useState([]);
    const [ is_all, setIs_all ] = useState(true); 
  
  
  
    const [toAdd, setToAdd] = useState(false);
  
    const handleAdd = () => {
      setToAdd(!toAdd);
    }
  
 
  
    useEffect(() => {
      const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      };
      axiosInstanse.get("/get-user-name", { headers })
        .then(response => {
          setAllUser(response.data.body);
        })
    },[])
    async function addInbox() {
      if (!toAdd)
        return;
  
    const inbox = {
      user_id: user_id,
      is_all: is_all,
      message: message,
      title: title
    }
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    await axiosInstanse.post('/add-inbox', inbox, { headers })
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
  
    addInbox();
  }, [toAdd]);

    return (
        <div>
            <label onClick={handleOpen} className="addButton">Add new message</label>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction='row' justifyContent='space-between'>
                        <p className='bannerModalTitle'>New message</p>
                        <IoMdClose className='Xicon' onClick={handleClose} />
                    </Stack>
                    <Row>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Title:</p>
                                <input type="text" value={title} onInput={e => setTitle(e.target.value)} />
                            </Stack>
                        </Col>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' marginTop={2} spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '16px' }}>Message:</p>
                                <textarea name="" id="" cols="30" rows="10" value={message} onInput={e => setMessage(e.target.value)} />
                            </Stack>
                        </Col>
                        <Col lg={12} md={6} xs={6} sm={6}>
                            <Stack direction='row' marginTop={3} spacing={2}>
                                <input style={{ marginTop: '5px' }} type='checkbox' checked={is_all} value={is_all} onChange={e=>setIs_all(!is_all)}/>
                                <label>Send to all users</label>
                            </Stack>
                        </Col>
                            {
                            !is_all?
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' marginTop={2} spacing={0}>
                            <p className='inputTitle'>User:</p>
                            <select name="" style={{ height: '30px' }} value={user_id} id="" onChange={e => setUser_id(e.target.value)}>
                                <option value="0">Select...</option>
                                {
                                allUser.map((element, i) => {
                                    return (<option value={element.id}>{element.fullname}</option>)
                                })
                                }
                            </select>
                            </Stack>
                        </Col>
                            :
                            null
                            }
                            <Col lg={9} ></Col>
                            <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack direction='row' spacing={2}>
                                <div className="sentButtonInbox">
                                    <button  onClick={handleAdd}><img src="images/send.svg" style={{ marginRight: '10px', height: '17px' }} alt="" /> Send</button>
                                </div>
                            </Stack>
                        </Col>
                       

                    </Row>
                </Box>
            </Modal>
        </div>
    )
}

export default AddInbox
