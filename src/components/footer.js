import React from "react"
import { Col, Image } from "react-bootstrap"
import ReactLogo from "../images/react.png"
import GatsbyLogo from "../images/gatsby.png"
import GraphqlLogo from "../images/graphql.png"

const style = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "60px",
  width: "100%",
  fontSize: "14px",
}

const logoStyle = {
  width: 30,
  height: 30,
}

class Footer extends React.Component {
  render() {
    return (
        <Col style={style}>
          Paul Semel &#169; - Built with{" "}
          <Image style={logoStyle} src={ReactLogo} alt="ReactJS" title="ReactJS" />{" "}
          <Image
            style={logoStyle}
            src={GatsbyLogo}
            alt="GatsbyJS"
            title="GatsbyJS"
          />{" "}
          <Image
            style={logoStyle}
            src={GraphqlLogo}
            alt="GraphQL"
            title="GraphQL"
          />
        </Col>
    )
  }
}

export default Footer
