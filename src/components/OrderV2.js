/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { delTableNum } from "../store/actions";
import { BsCart4 } from "react-icons/bs";


import { xhr } from '../utils/xhr'
import ModalDetailMenu from './ModalDetailMenu'
import ModalOrderDetail from './ModalOrderDetail'
import FoodItem from "./common/FoodItem";


const Order = (props) => {

  const [arrMenu, setArrMenu] = useState([])
  const [productDetail, setProductDetail] = useState(null)
  const [arrOrder, setArrOrder] = useState([])
  const [isOpenOrder, setOpenOrder] = useState(false)
  const [isOpenDetail, setOpenDetail] = useState(false)

  const updateQuantityOrder = (id, qty) => {
    setArrOrder(
      arrOrder.map(product => product.id === id ? { ...product, qty } : product)
    )
  }
  
  const toggleOpenDetail = () => {
    setOpenDetail(!isOpenDetail)
  }

  // TOGGLE SIDEBAR
  const toggleOrder = () => {
    setOpenOrder(!isOpenOrder)
  };

  // GET MENU INFO
  useEffect(() => {
    (async () => {
      try {
        const res = await xhr.get('/menu')
        setArrMenu(res.data)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  const RenderAllMenu = () => {
    return (
      <Row className='justify-content-between'>
        {
          arrMenu.map(product => (
            <Col md={6}>
              <FoodItem 
                product={product}
                addDetail={addDetail}
              />
            </Col>
          ))
        }
      </Row>
    )
  }

  // ADD DETAIL INFO
  const addDetail = (name, description, price, id, type,photos) => {
    setProductDetail({ name, description, price, id, type, photos })
    setOpenDetail(true)
  };

  // DELETE DETAIL INFO
  const delDetail = () => {
    setProductDetail(null)
    setOpenDetail(true)
  };


  const resetTable = () => {
    delTableNum()
  };

  return (
    <div className="app">
      <div className="sidebar-container">
        <div className="d-flex h-100 justify-content-start ">
          <button
            onClick={toggleOrder}
            className="btn btn-primary btn-block p-1"
          >
            <BsCart4 size={'3rem'} />
          </button>
        </div>
      </div>
      
      <div className="container">
        <RenderAllMenu />
      </div>
      <Link to="/table" className="d-flex justify-content-end ">
        <button className="btn btn-primary" onClick={resetTable}>
          Back
        </button>
      </Link>
      <div key="extra" style={{ height: 600 }}></div>

      {/* modal section */}

      <ModalDetailMenu 
        product={productDetail} 
        arrOrder={arrOrder} 
        setArrOrder={setArrOrder} 
        delDetail={delDetail} 
        isOpen={isOpenDetail}
        toggle={toggleOpenDetail}
      />

      <ModalOrderDetail
        isOpen={isOpenOrder}
        toggle={toggleOrder}
        arrOrder={arrOrder}
        setArrOrder={setArrOrder}
        updateQuantityOrder={updateQuantityOrder}
      />

      {/* end modal section */}
    </div>
  );
}



const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    userType: state.auth.userType,
    tableNum: state.tableNum.tableNum
  };
};

export default connect(mapStateToProps, { delTableNum })(Order);
