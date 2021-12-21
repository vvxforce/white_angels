import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

import logo from "../img/logo.svg";
import "../css/Navbar.css";

const Container = styled.div`
  padding: 3% 30px;
  ${mobile({
    height: "50px",
    padding: "10px 0px"
  })}
`;

const Right = styled.div`
  position: absolute;
  top: 5%;
  right: 2%;
  font-size: 14px;
`;

const MenuItem = styled.div`
  display: inline-block;
  margin: 0 47px 0 0;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = ({ center }) => {
  return (
    <Container className={center ? 'center' : ''}>
      {center
        ? <>
            <img src={logo} className="logo" alt="While Angels" />
            <strong className="text">WHT.</strong>
          </>
        : <Link to="/home">
            <img src={logo} className="logo" alt="While Angels" />
          </Link>
      }
      <Right>
        <Link to="/contact">
          <MenuItem>Contacts</MenuItem>
        </Link>
        <span className="language">RU</span>
        |
        <span className="language">EN</span>
      </Right>
    </Container>
  );
};

export default Navbar;
