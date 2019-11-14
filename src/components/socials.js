import React from "react"
import { SocialIcon } from 'react-social-icons'

class Socials extends React.Component {
  render() {
    return (
        <>
            <SocialIcon url="https://www.linkedin.com/in/paul-semel/" style={{ marginRight: '5px' }} />
            <SocialIcon url="https://github.com/paulsemel" style={{ marginRight: '5px' }} />
            <SocialIcon url="https://twitter.com/semel_paul" />
        </>
    )
  }
}

export default Socials
