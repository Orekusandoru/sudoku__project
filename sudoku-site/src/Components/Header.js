import React, { Component } from 'react'
import { FormControl, Navbar, Nav, Container, Button, Form } from 'react-bootstrap';
import logo from './logo192.png';

export default class Header extends Component {
  render() {
    return (
      <>
        <Navbar fixed="top" collapseOnSelect="md" bg="dark" variant="dark">
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
      </>
    );
  }
}
