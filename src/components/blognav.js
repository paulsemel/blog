import React from "react"
import { Nav, Navbar } from "react-bootstrap"

class BlogNav extends React.Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/" style={{textAlign: "center"}}>About</Nav.Link>
            <Nav.Link href="/posts" style={{textAlign: "center"}}>Posts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default BlogNav
