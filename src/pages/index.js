import React from 'react'
import Layout from '../components/layout'
import { Col, Row } from 'react-bootstrap';
import { graphql, StaticQuery } from "gatsby"
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import Thumbnail from '../components/thumbnail'
import Socials from '../components/socials';
import { SocialIcon } from 'react-social-icons'

const thumbStyle = {
  width: '100%',
  height: '100%',
  maxWidth: '300px',
  maxHeight: '300px',
}

const aboutQuery = graphql`
query AboutQuery {
  mdx(
    fileAbsolutePath: {regex: "/.*pages/about.*/i"}
    ) {
        body
      }
}
`

class IndexPage extends React.Component {
  render() {
    return (
      <Layout title="Home">
        <br />
        <br />
        <Row>
          <Col
            xs={12} md={3}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            <Row className="justify-content-center">
              <Col xs="auto">
                <Thumbnail />
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col xs="auto">
                <Socials />
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col style={{ alignItems: 'center' }} xs="auto">
                <span className="text-nowrap">
                <a style={{ marginRight: '5px' }} href='https://jenkins.paulsemel.org/job/paul-blog/'><img src='https://jenkins.paulsemel.org/buildStatus/icon?job=paul-blog' /></a>
                <SocialIcon style={{ marginLeft: '5px' }} network="sharethis" url="https://github.com/paulsemel/blog" label="Source code" />
                </span>
              </Col>
            </Row>
          </Col>
          <Col style={{ marginLeft: '10px', marginRight: '10px' }}>
            <br />
            <StaticQuery
              query={aboutQuery}
              render={data => (
                <MDXRenderer>{data.mdx.body}</MDXRenderer>
              )}
            />
          </Col>
        </Row>

        <br /><br />
      </Layout>
    )
  }
}

export default IndexPage
