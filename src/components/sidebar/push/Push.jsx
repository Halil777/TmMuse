import React, { useState } from 'react'
import './Push.css'
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../utils/axiosInstanse'
import { useEffect } from 'react';
import SnackBarApp from '../../snackbar/SnackBarApp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { dark } from '@mui/material/styles/createPalette';


            

const Push = () => {
    const [titleTM, setTitleTM] = useState('');
    const [titleRU, setTitleRU] = useState('');
    const [bodyTM, setBodyTM] = useState('');
    const [bodyRU, setBodyRU] = useState('');
    const [url, setUrl] = useState('?');
    const [isAll, setIsAll] = useState(true);
    const [profileId, setProfileId] = useState('');
    const [isSend, setIsSend] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [user_id, setUser_id] = useState(0);


    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };
    const sendNotification = async () => {
        if (isAll && url == '?') {
            axiosInstanse.post('/push-to-topic', {
                title: titleTM + " / " + titleRU,
                body: bodyTM + "\n" + bodyRU,
                topic: "string"
            }, {
                headers
            })
                .then(response => {
                    toast.success('🦄 Success!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                })
                .catch(ex => {
                    alert(ex)
                })
        } else if (isAll && url != '?') {
             axiosInstanse.post('/push-to-topic', {
                title: titleTM + " / " + titleRU,
                body: bodyTM + "\n" + bodyRU,
                topic: "string",
                url: url
            }, {
                headers
            })
                .then(response => {
                    <SnackBarApp/>
                })
                .catch(ex => {
                    alert(ex)
                })
        } else {
            let token = profileId;
            if (profileId == '') {
                token = "f4qJNAbnSHOlZV24SpFaoK:APA91bHA_rmvTQzrmylJFiK362NyccjkFsWDNTKwgPNOjZVZoA355xGP-41_TzBhjRuD0PJJitiej-2J8GsdEzfHo0A-cp2sfzsDzBc336lUacJvERTXG_0s8XjDUh0ay1JkLZMULJqz";
            }
            axiosInstanse.post('/push-to-token', {
                title: titleTM + " / " + titleRU,
                body: bodyTM + "\n" + bodyRU,
                token: token
            }, {
                headers
            })
                .then(response => {
                    alert("Sent to one user")
                })
                .catch(ex => {
                    alert(ex)
                })
        }

        setIsSend(false);


    }
    useEffect(() => {
        axiosInstanse.get("/get-user-name", { headers })
          .then(response => {
            setAllUser(response.data.body);
          })
      }, [])
    useEffect(() => {
        if (!isSend)
            return;
        sendNotification();
    }, [isSend]);

    const handleClick = () => {
        setIsSend(true);
    }


    

    return (
        <div className='content'>
            
            <p style={{ color: '#31456A', fontWeight: 'bold', fontSize: '30px', paddingLeft: '40px', paddingTop: '30px' }}>Push notification</p>
            <div style={{ background: 'white', width: '92%', height: 'auto', marginLeft: '40px', marginTop: '30px' }}>
                <div style={{ width: '91%', marginLeft: '40px', paddingTop: '30px' }}>
                    <Row>
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
                            <Stack direction='column' spacing={-2} marginTop={3}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Description tm:</p>
                                <textarea name="" id="" cols="30" rows="5"
                                    value={bodyTM} onInput={e => setBodyTM(e.target.value)}></textarea>
                            </Stack>
                        </Col>
                        <Col lg={6} md={6} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={3}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Description ru:</p>
                                <textarea name="" id="" cols="30" rows="5"
                                    value={bodyRU} onInput={e => setBodyRU(e.target.value)}></textarea>
                            </Stack>
                        </Col>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2} marginTop={3}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>URL (eg:?profile_id=1&category_id=2):</p>
                                <input type="text"
                                    value={url} onInput={e => setUrl(e.target.value)}></input>
                            </Stack>
                        </Col>
                        <Col lg={12} md={12} xs={12} sm={12} marginTop={3}>
                            <input type="checkbox" checked={isAll}
                                value={isAll} onChange={e => setIsAll(!isAll)} /><label>Send to all users</label>


                        </Col>
                        {
                            !isAll ?
                                <Col lg={12} md={12} xs={12} sm={12} marginTop={3}>
                                    <select name="" style={{ height: '30px', width:'330px' }} id="" onChange={e => setUser_id(e.target.value)}>
                                        <option value="0">Select...</option>
                                        {
                                            allUser?.map((element, i) => {
                                                return (<option value={element.id}>{element.fullname}</option>)
                                            })
                                        }
                                    </select>
                                </Col>
                                :
                                null
                        }
                        <Col lg={9} md={12} xs={12} sm={12}></Col>
                        <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack direction='row' marginLeft={11} spacing={2}>
                                <div className="sentButtonInbox">
                                    <button onClick={handleClick}><img src="images/send.svg" style={{ marginRight: '10px', height: '17px' }} alt="" /> Send</button>
                                </div>
                            </Stack>
                        </Col>






                    </Row>

                    <br />
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Push
