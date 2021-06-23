import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink, withRouter } from "react-router-dom";
import './nav.scss'

const NavB = (props) => {
  const [token, setToken] = useState("");
  const logOut = () => {
    localStorage.setItem("tokenKey", JSON.stringify(""));
    setToken("");
    props.history.push('/login')
  };
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("tokenKey")) || "");
  });
  const navDinamico =
    token !==
    "" ? (
      <div className='flexDinamico'>
        <NavLink className="nav-link" exact={true} to="/">
          Home
        </NavLink>
        <NavLink className="nav-link" exact={true} to="/search">
          Heroes
        </NavLink>
        <button onClick={logOut} className="nav-link btn">
          Cerrar sesion
        </button>
      </div>
    ) : (
      <NavLink className="nav-link" exact={true} to="/login">
        Login
      </NavLink>
    );
  return (
    <Navbar bg="light" expand="lg">
      <div className="container">
        <NavLink className="navbar-brand" exact={true} to="/">
          Heroes Challenge
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">{navDinamico}</Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default withRouter(NavB);
