import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
} from "reactstrap";
import Swal from 'sweetalert2'

import { xhr } from '../utils/xhr'
import ModalOrderConfirm from './ModalOrderConfirm'

const ModalOrderDetail = (props) => {

  const {
    isOpen,
    toggle,
    arrOrder,
    updateQuantityOrder,
    setArrOrder,
  } = props

  const [tableNum, setTableNum] = useState(0)
  const [isOpenConfirm, setOpenConfirm] = useState(false)
  
  const toggleConfirm = () => {
    setOpenConfirm(!isOpenConfirm)
  }


  const EmptyCartMessage = () => {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>Your Cart is Empty</h2>
        <p style={styles.message}>You do not have anything in your cart now.</p>
      </div>
    );
  };
  
  const styles = {
    container: {
      textAlign: 'center',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginTop: '20px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      color: '#333',
    },
    message: {
      color: '#666',
    },
  };

  // SIDEBAR FRAME
  const renderLinks = () => {
    return (
      <div
        className="mt-2"
        style={{
          // ...linkStyle,
          // ...linkTransitionStyles[state]
        }}
      >
        <div>{renderOrders()}</div>
      </div>
    );
  };

  const decQty = (product) => {
    const _product = arrOrder.find(order => order.productId === product.productId);
    if (_product) {
      product.qty -= 1
      if (_product.qty <= 0) return onDelete(product.productId)
      updateQuantityOrder(arrOrder)
    }

  };

  // INCREASE INPUT QTY
  const incQty = (product) => {
    const _product = arrOrder.find(order => order.productId === product.productId);
    if (_product) product.qty += 1
    console.log(arrOrder)
    updateQuantityOrder(arrOrder)

  };

  useEffect(() => {
    console.log(arrOrder, 'ini bos')
  }, [arrOrder, updateQuantityOrder])

  // RENDER ORDERS
  const renderOrders = () => {
    // let { id, customerId, orderDetail, status } = arrOrder
    if (!arrOrder.length) return (
      <EmptyCartMessage/>
    )

    return arrOrder.map(order => {
      return (
        <Row className="container mx-auto">
          <Col xs="11" className="border-bottom border-top border-dark p-0">
            <div className="d-flex py-4">
              <div className="pt-1 mx-2">{order.name}</div>
              <div className="ml-auto mx-2">Qty : 
                <button className="circle-button mx-2" onClick={() => decQty(order)}>
                  -
                </button>
                {order.qty}
                <button className="circle-button mx-2" onClick={() => incQty(order)}>
                  +
                </button>
              </div>
              {/* <div className="ml-auto">
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(order.productId)}
                >
                  X
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
      );
    });
  };

  // DELETE ORDER CONTENT
  const onDelete = id => {
    let array = [...arrOrder];
    let index = array
      .map(function(e) {
        return e.productId;
      })
      .indexOf(id);
    if (index === -1) return alert("No index");
    array.splice(index, 1);
    setArrOrder(array)
  };

  // SUBMIT ORDER
  const onSubmit = async () => {
    toggle();

    arrOrder.forEach(function(v) {
      delete v.name;
    });
    arrOrder.forEach(function(v) {
      delete v.type;
    });
    arrOrder.forEach(function(v) {
      delete v.price;
    });
    let data = arrOrder.reduce(
      (acc, obj) => [...acc, Object.values(obj).map(y => y)],
      []
    );
    
    const formdata = {
      table: tableNum,
      note: '',
      list: data.map(row => ({
        menu: row[0],
        note: '',
        quantity: row[2]
      }))

    }

    try {
      await xhr.post('/order/create', formdata)
      Swal.fire('Ordered', '', 'success')
      setArrOrder([])
      setTableNum(0)
      setOpenConfirm(false)
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      size="lg" 
      style={{maxWidth: '700px', width: '100%'}}
    >
      <ModalHeader>
        Cart
      </ModalHeader>
      <ModalBody>
        <div
          className="sidebar"
          style={{
            // ...sidebarStyle,
            // ...sidebarTransitionStyles[state]
          }}
        >
          <div>{renderLinks()}</div>
          {arrOrder.length > 0 ? (
            <div>
              <button
                className="btn btn-block btn-success mt-5 py-3 px-0"
                onClick={toggleConfirm}
              >
                Submit order
              </button>
              <ModalOrderConfirm 
                tableNumber={tableNum}
                setTableNumber={setTableNum}
                isOpen={isOpenConfirm}
                toggle={toggleConfirm}
                order={arrOrder}
                onSubmit={onSubmit}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ModalOrderDetail