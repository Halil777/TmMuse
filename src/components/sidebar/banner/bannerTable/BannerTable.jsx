import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import UpdateBannerModal from '../bannerModal/updateBannerModal/UpdateBannerModal'
import DeleteBanner from '../deleteBanner/DeleteBanner'
import './BannerTable.css'
import Loading from '../../../loading/Loading'
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty'


const BannerTable = (props) => {
    const [bannerList, setBannerList] = props.bannerList;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = props.pageCount;
    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);
    useEffect(() => {
        props.getBanner(page);
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
      };


   

    return (
        <div className='bannerHeight'>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <UpdateBannerModal handleClose={handleClose} getData={props.getBanner}   data={element} />
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
                    <DeleteBanner handleClose={handleClose1} getData={props.getBanner} bannerId={elementId} />
                </Modal>
        {bannerList.length==0?<Empty/>:
              <Table responsive borderless className='profileTable'>
              <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Link</th>
                  <th>Profile Name</th>
                  <th>Order</th>
                  <th>Delete</th>
                  <th>Edit</th>
              </tr>
              {  bannerList.map((element,i)=>{
                    return(
                            <tr>
                            <td>{element.id}</td>
                            <td><img src={ip+element.image} style={{width: '150px', height: '100px', objectFit: 'cover'}} /></td>
                            <td>{element.link}</td>
                            <td>{element.profile_id}</td>
                            <td>{element.order}</td>
                            <td><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></td>
                           <td style={{paddingRight:'20px'}}><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></td>
                        </tr>
                         )
                     })
                 }
                  
                           
                
                </Table>
                }
                {bannerList.length==0?null:
                <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', justifyContent:'center', display:"flex"}} />}
            
            
           
           
            </div>

    )
}

export default BannerTable
