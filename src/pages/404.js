import React from 'react'
import Layout from '../components/layout'
import { Image, Col } from "react-bootstrap"
import Img404 from '../images/404-error.png'

const imgStyle = {
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '200px',
}

class About extends React.Component {
  render() {
    return (
      <Layout>
          <Col xs={12} className="justify-content-center" style={{ display: 'flex', left: 0, right: 0, bottom: 0, top: 0, overflow: 'auto', zIndex: -1, position: 'fixed', alignItems: 'center'}}>
          <Image
            style={imgStyle}
            src={Img404}
            alt="Paul Semel"
            title="Paul Semel"
          />
        </Col>
      </Layout>

    )
  }
}

export default About;