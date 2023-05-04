import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FormControl, Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import logo from './logo192.png'
import Home from '../Pages/Home'
import About from '../Pages/About'
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
            </Navbar.Brand>Sudoku
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>


              </Nav>
              <Form className='d-flex'>
                <FormControl
                  type="text"
                  placeholder='Search'
                  className="mr-sm-2"
                />
                <Button variant="outline-info">Search</Button>
              </Form>

            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />

          </Routes>
        </Router>
      </>
    );
  }
}
