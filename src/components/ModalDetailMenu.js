import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
} from "reactstrap";
import Swal from 'sweetalert2'

const ModalDetailMenu = (props) => {

  const {
    product,
    arrOrder,
    setArrOrder,
    delDetail,
    isOpen,
    toggle,
  } = props

  const [qty, setQty] = useState(0)

  useEffect(() => {
    setQty(0)
  }, [toggle])

  if (!product) return null

  const decQty = () => {
    if (qty > 0) {
      setQty(qty - 1)
    }
  };

  // INCREASE INPUT QTY
  const incQty = () => {
    if (qty >= 0) {
      setQty(qty + 1)
    }
  };

  // DECREASE INPUT QTY BY 5
  const decQty5 = () => {
    if (qty >= 5) {
      setQty(qty - 5)
    }
    if (qty < 5) {
      setQty(0)
    }
  };

  // INCREASE INPUT QTY BY 5
  const incQty5 = () => {
    if (qty >= 0) {
      setQty(qty + 5)
    }
  };

  // RESET INPUT QTY
  const resetQty = () => {
    setQty(0)
  };

  // INPUT ORDER TO SIDEBAR
  const addOrder = async (name, price, id, type) => {
    if (qty === 0) {
      return alert("Please insert quantity");
    }
    if (qty > 100) {
      return alert("Qty over limit")
    }
    let product = arrOrder.filter(val => {
      return val.id === id;
    });
    if (product.length > 0) {
      let sum = parseInt(product[0].qty) + parseInt(qty);
      if(sum > 100) {
        return alert('Qty cannot be more than 100 pcs')
      }
      let array = [...arrOrder];
      let index = array
        .map(function(e) {
          return e.productId;
        })
        .indexOf(id);
      if (index === -1) return alert("No index");
      array.splice(index, 1);
      Swal.fire({
        title:`${name} qty updated to ${sum} pcs`,
        timer: 1000,
        showConfirmButton: false,
        width:'50%',
        height:'40%'
      })
      return setArrOrder([
        ...array,
        {
          name: name,
          price: price,
          productId: id,
          type: type,
          customerTable: props.tableNum,
          qty: sum
        }
      ])
    }
    Swal.fire({
      title:`${qty} pcs ${name} added`,
      timer: 1000,
      showConfirmButton: false,
      width:'50%',
      height:'40%'
    })
    setArrOrder([
      ...arrOrder,
      {
        name: name,
        price: price,
        productId: id,
        type: type,
        customerTable: props.tableNum,
        qty
      }
    ])
  };

  // QTY INPUT FN
  const inputQty = e => {
    let qty = parseInt(e.target.value);
    if (isNaN(qty)) {
      return setQty(0)
    }
    setQty(qty)
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      size="lg" 
      style={{maxWidth: '700px', width: '100%'}}
      // className={props.className}
    >
      <ModalHeader >
        {product.type?.name || ''}
      </ModalHeader>
      <ModalBody>
        <Row className="mt-3 mb-3">
          <Col md="6" className='text-center d-flex flex-wrap align-items-center'>
            <CardImg
              left={true.toString()}
              style={{width:'100%',height:'auto'}}
              className="mx-auto my-2 "
              src={product.photos}
              alt=""
              />
            
          </Col>
          <Col md="6" className="align-content-center">
            <Card className="text-center ">
              <CardTitle className="mt-2">
                <h3 className="text-center">{product.name}</h3>
              </CardTitle>
            </Card>
            <Card className="text-center mt-2 pb-2 overflowTest">
              <CardTitle className="mt-2">
                <h5>{product.description}</h5>
              </CardTitle>
            </Card>
            <Card className="mt-3 ">
              <CardTitle className="my-3 text-center">
                <h5 className="mb-0">
                  Qty :
                  <div className="ml-3">
                    <input
                      style={{textAlign:'center'}}
                      type="text"
                      min="0"
                      maxLength='3'
                      onChange={e => inputQty(e)}
                      value={qty}
                    />
                  </div>
                  <div className='m-1 d-flex justify-content-around text-center'>
                    <button
                      className="btn btn-info"
                      onClick={decQty5}
                    >
                      -5
                    </button>
                    <button className="btn btn-info" onClick={decQty}>
                      -
                    </button>
                    <button className="btn btn-info " onClick={incQty}>
                      +
                    </button>
                    <button
                      className="btn btn-info "
                      onClick={incQty5}
                    >
                      +5
                    </button>
                  </div>
                  <div className=" mt-1">
                    <button
                      className="btn btn-danger "
                      onClick={resetQty}
                    >
                      Reset
                    </button>
                  </div>
                </h5>
              </CardTitle>
            </Card>
          </Col>
          <Col className="pl-0 d-flex justify-content-between mt-2" md="12">
            <button className="h-100 btn btn-danger" onClick={delDetail}>
              Close
            </button>
            <button
              className="btn btn-warning btn-block"
              onClick={() =>
                addOrder(
                  product.name,
                  product.price,
                  product.id,
                  product.type
                )
              }
            >
              Add order
            </button>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default ModalDetailMenu