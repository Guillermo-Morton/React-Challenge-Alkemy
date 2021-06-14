import React from "react";
import { Navbar , Nav } from 'react-bootstrap'
import { NavLink } from "react-router-dom";

const NavB = () => {
  return (
    <div className='container'>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Heroes Challenge</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavLink className='nav-link' exact={true} to='/'>Home</NavLink>
            <NavLink className='nav-link' exact={true} to='/search'>Heroes</NavLink>
            <NavLink className='nav-link' exact={true} to='/login'>Login</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavB;
