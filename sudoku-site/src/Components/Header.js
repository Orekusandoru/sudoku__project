import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link,Navigate } from 'react-router-dom';
import { FormControl, Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import logo from './logo192.png'
import Home from '../Pages/Home'
import About from '../Pages/About'
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";
export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar sticky="top" collapseOnSelect="md" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">
              <img
                src={logo}
                height="30"
                width="30"
                className='d-inline-block align-top'
                alt="logo"
              />
            </Navbar.Brand>
            <Nav.Link href="/">Sudoku</Nav.Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
              </Nav>

              
                
              <Nav className='ms-auto'>
                <Form className=' logview '>
                  
                    <Nav.Link  href="/login">Login</Nav.Link>
                    
                </Form>
                <Form className=' App-header '>

                    <Nav.Link href="/signup">SignUp</Nav.Link>
                </Form>
              </Nav>
              

            </Navbar.Collapse>
            
           
          </Container>
          
        </Navbar>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            

          </Routes>
        </Router>
      </>
    );
  }
}
