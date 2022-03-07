import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'
import DeletePromoCode from '../deletePromoCode/DeletePromoCode';
import UpdatePromoCode from '../updatePromoCode/UpdatePromoCode';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';



const PromoCodeTable = (props) => {
    const [promoList, setPromoList] = props.promoList;
    const [isEmpty, setIsEmpty] = props.isEmpty;
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
        props.getPromo(page);
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
  return <div>
     <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <UpdatePromoCode handleClose={handleClose} getData={props.getPromo}   data={element} />
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
                    <DeletePromoCode handleClose={handleClose1} getData={props.getPromo} promo_codeId={elementId} />
                </Modal>
            {(promoList.length==0 && !isEmpty)?<Loading/>: (promoList.length==0 && isEmpty)?<Empty/>
      :<Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Promo code</center></th>
                <th><center>Profile</center></th>
                <th><center>User</center></th>
                <th><center>Status</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
             {  promoList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.promo_code}</center></td>
                <td><center>{element.nameTM}</center></td>
                <td><center>{element.fullname}</center></td>
                <td><center>{element.status}</center></td>
                <td><center><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></center></td>
                <td><center><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></center></td>
            </tr>
                 )
        })
}
    
            </Table>
}
{
    promoList.length == 0? null
    :

            <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', justifyContent:'center', display:"flex"}} />
}
  </div>;
};

export default PromoCodeTable;
