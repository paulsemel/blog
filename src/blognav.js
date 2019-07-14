import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'

const BlogNav = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">PaulSemel.org</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Posts</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default BlogNav;