import React from "react"
import { Image } from "react-bootstrap"
import Thumb from "../images/thumb.jpg"

const thumbStyle = {
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    maxHeight: '300px',
}

class Thumbnail extends React.Component {
  render() {
    return (
        <Image
            style={thumbStyle}
            src={Thumb}
            alt="Paul Semel"
            title="Paul Semel"
            roundedCircle
        />
    )
  }
}

export default Thumbnail
