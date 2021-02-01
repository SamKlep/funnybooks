import React from 'react'
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap'

const Header = () => {
  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Funny Books</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/add'>Add</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type='text' placeholder='Search' className='mr-sm-2' />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header
