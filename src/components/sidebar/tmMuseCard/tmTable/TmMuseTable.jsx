import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import DeleteTmCard from '../deleteTmCard/DeleteTmCard';
import UpdateTmCard from '../updateTmCard/UpdateTmCard';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';



const TmMuseTable = (props) => {
  const [cardList, setCardList] = props.cardList;
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = props.pageCount;
  const [open, setOpen] = React.useState(false);
  const [element, setElement] = useState();
  const handleOpen = (element) => { setOpen(true); setElement(element) }
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = React.useState(false);
  const [elementId, setElementId] = useState();
  const handleOpen1 = (id) => { setOpen1(true); setElementId(id) }
  const handleClose1 = () => setOpen1(false);

  //   useEffect(() => {
  //     props.getCard(page);
  // }, [page]);

  useEffect(() => {
    props.getCard(page);
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
        <UpdateTmCard handleClose={handleClose} getData={props.getCard} data={element} />
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
        <DeleteTmCard handleClose={handleClose1} getData={props.getCard} cardId={elementId} />
      </Modal>
      {cardList.length == 0 ? <Empty /> :
        <Table responsive borderless className='profileTable'>
          <tr>
            <th>ID</th>
            <th>Full name</th>
            <th>Email</th>
            <th>User</th>
            <th>Status</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
          {cardList.map((element, i) => {
            return (
              <tr>
                <td>{element.id}</td>
                <td>{element.fullname}</td>
                <td>{element.email}</td>
                <td>{element.user_id}</td>
                <td>{element.status}</td>
                <td><img onClick={() => handleOpen1(element.id)} src="images/Delete.svg" alt="" /></td>
                <td style={{paddingRight:'50px'}}><img src="images/Edit.svg" onClick={() => handleOpen(element)} alt="" /></td>
              </tr>
            )
          })
          }


        </Table>
      }
      {cardList.length == 0 ? null :

        <Pagination count={pageCount}
          page={page}
          onChange={handleChange}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          activeClassName={'active'}
          style={{ marginTop: '20px', justifyContent: 'center', display: "flex" }} />
      }

    </div>
  )
}

export default TmMuseTable
