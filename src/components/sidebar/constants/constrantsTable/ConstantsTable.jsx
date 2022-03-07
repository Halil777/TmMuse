import React, { useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import DeleteConstant from '../deleteCons/DeleteConstant';
import UpdCons from '../updateCons/UpdCons';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';



const ConstantsTable = (props) => {

    const[constantList,setConstantList]=props.constantList;
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]= props.pageCount;
    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);
 
    useEffect(() => {
        props.getConstant(page);
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
                    <UpdCons handleClose={handleClose} getData={props.getConstant} data={element} />
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
                    <DeleteConstant handleClose={handleClose1} getData={props.getConstant} constantId={elementId} />
                </Modal>
            {constantList.length==0?<Empty/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Title</center></th>
                <th><center>Type</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {  constantList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.titleTM}</center></td>
                <td><center>{element.type}</center></td>
                <td><center><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></center></td>
                <td><center><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></center></td>
            </tr>
            )
        })
}
            
            </Table>
}
{constantList.length==0? null:
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

export default ConstantsTable;
