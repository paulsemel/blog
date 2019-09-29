import React from "react"
import BlogNav from "./blognav"
import Footer from "./footer"
import { Helmet } from 'react-helmet'

const style = {
  fontFamily: 'Roboto',
  margin: 0,
  width: '100%'
}

class Layout extends React.Component {
  render() {
    return (
      <div style={style}>
	  	<Helmet>
			  <title>Paul Semel{this.props.title ? " - " + this.props.title : ""}</title>
		  </Helmet>
        <BlogNav />
        {this.props.children}
        <br />
        <Footer />
      </div>
    )
  }
}

export default Layout
