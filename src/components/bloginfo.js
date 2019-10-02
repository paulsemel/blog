import React from "react"
import { SocialIcon } from 'react-social-icons'
import { Row, Col } from 'react-bootstrap'

class BlogInfo extends React.Component {
    render() {
        return (
            <Row style={{...this.props.style}}>
                <Col xs={8} style={{alignItems: 'center', display: 'flex', padding: 4 }}>
                    <a style={{width: '100%'}} href='https://jenkins.paulsemel.org/job/paul-blog/'><img style={{width: '100%'}} src='https://jenkins.paulsemel.org/buildStatus/icon?job=paul-blog' /></a>
                </Col>
                <Col xs={4} style={{ padding: 4 }}>
                    <SocialIcon style={{ width: '100%', height: '0', paddingBottom: '100%', }} network="sharethis" url="https://github.com/paulsemel/blog" label="Source code" />
                </Col>
            </Row>
        )
    }
}

export default BlogInfo
