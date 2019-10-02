import React from "react"
import BlogNav from "./blognav"
import Footer from "./footer"
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

const style = {
  fontFamily: 'Roboto',
  margin: 0,
  width: '100%',
  overflowX: 'hidden',
}

class Layout extends React.Component {
  render() {
    return (
      <Container fluid={true} style={style}>
        <Helmet>
          <title>Paul Semel{this.props.title ? " - " + this.props.title : ""}</title>
        </Helmet>
        <BlogNav />
        {this.props.children}
        <br />
        <Footer />
      </Container>
    )
  }
}

export default Layout
