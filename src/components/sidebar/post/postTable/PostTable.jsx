import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import PostDelete from '../postDelete/PostDelete'
import UpdatePost from '../updatePost/UpdatePost'
import ip from '../../server_adress/serveradress';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';



const PostTable = (props) => {
    const [postList, setPostList] = props.postList;
    const [page, setPage] = useState(1);
    const [isEmpty, setIsEmpty] = props.isEmpty;
    const [pageCount, setPageCount] = props.pageCount;
    const [allProfileList, setAllProfile] = useState([]);
    const [profileId, setProfileId] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);
    

    useEffect(() => {
        props.getPost(page);
    }, [page]);
 

    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <UpdatePost handleClose={handleClose} getData={props.getPost}   data={element} />
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open1}
                    onClose={handleClose1}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <PostDelete handleClose={handleClose1} getData={props.getPost} postId={elementId} />
                </Modal>

                {(postList.length==0 && !isEmpty)?<Empty/>
                :<Table responsive borderless className='profileTable'>
                    <tr>
                        <th>ID</th>    
                        <th style={{paddingLeft:'40px'}}>Image</th>
                        <th style={{paddingLeft:'80px'}}>Title</th>
                        <th>Promotion</th>
                        <th>Profile</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </tr>
                    {postList.map((element, i) => {
                        return (
                           element.id!=0 && <tr>
                                <td>{element.id}</td>
                                <td style={{paddingLeft:'40px'}}><img src={ip + element.image} alt="" style={{ width: '150px', height: '100px', objectFit: 'cover' }} /></td>
                                <td style={{paddingLeft:'80px'}}>{element.titleTM}</td>
                                <td style={{paddingRight:'50px'}}>{element.promotion}</td>
                                <td style={{paddingRight:'50px'}}>{element.profile_id == 0 ? element.site_url : element.profile_id}</td>
                                <td style={{paddingRight:'50px'}}><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></td>
                                <td style={{paddingRight:'50px'}}><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></td>
                            </tr>
                        )
                    })
                    }
                </Table>
                
            }
            {
                postList.length == 0 ? null :
                    <Pagination count={pageCount}
                        page={page}
                        onChange={handleChange}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        style={{ marginTop: '20px', justifyContent:'center', display:"flex" }} />}
        </div>
    )
}

export default PostTable

