import React from "react"
import {Row, Col } from 'react-bootstrap'
import { SocialIcon } from 'react-social-icons'

const SocialStyle = {
  width: '100%',
  height: '0',
  paddingBottom: '100%',
}

const WrapperStyle = {
  padding: '4px',
}

class Socials extends React.Component {
  render() {
    return (
        <Row style={{...this.props.style}}>
          <Col xs={4} style={WrapperStyle}>
            <SocialIcon url="https://www.linkedin.com/in/paul-semel/" style={SocialStyle} />
          </Col>
          <Col xs={4} style={WrapperStyle}>
            <SocialIcon url="https://github.com/paulsemel" style={SocialStyle} />
          </Col>
          <Col xs={4} style={WrapperStyle}>
            <SocialIcon url="https://twitter.com/semel_paul" style={SocialStyle} />
          </Col>
        </Row>
    )
  }
}

export default Socials
