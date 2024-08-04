import React, {  } from "react";
import {
  Navbar,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <div className="container d-flex justify-content-between">
          <Link to="/" className="navbar-brand mt-2">
            Simplistic
          </Link>
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
