import React, {  } from "react";
import {
  Nav,
  Navbar,
  NavItem,
  // NavbarToggler,
  // Collapse,
  // UncontrolledDropdown,
  // DropdownItem,
  // DropdownToggle,
  // DropdownMenu
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
// import { logoutData, delTableNum } from "../actions/index";

const Header = (props) => {
  // state = {
  //   nav: false
  // };

  // logoutData = () => {
  //   props.logoutData();
  //   props.delTableNum();
  //   alert("LOGOUT BERHASIL");
  // };

  // delTable = () => {
  //   props.delTableNum();
  // };


  // toggleNavbar = () => {
  //   setState({ nav: !state.nav });
  // };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container d-flex justify-content-between">
          {/* {props.userType === "cashier" ? (
            <Link
              to="/cashier"
              className="navbar-brand"
              onClick={delTable}
            >
              DOR
            </Link>
          ): (
            <Link to="/" className="navbar-brand">
              DOR
            </Link>
          )} */}
          <Link to="/" className="navbar-brand mt-2">
            DOR
          </Link>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink className="nav-link" to="/login">
                <button className="btn btn-secondary">LOGIN</button>
              </NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={state.nav} navbar>
            {renderNav()}
          </Collapse> */}
        </div>
      </Navbar>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    userType: state.auth.userType,
    tableNum: state.tableNum.tableNum,
    avatar: state.auth.avatar
  };
};

export default connect(mapStateToProps, null)(Header);
