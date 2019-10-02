import React from 'react'
import Layout from '../components/layout'
import { Col, Row } from 'react-bootstrap';
import { graphql, StaticQuery } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Thumbnail from '../components/thumbnail'
import Socials from '../components/socials';
import { SocialIcon } from 'react-social-icons'
import BlogInfo from '../components/bloginfo';

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
        code {
          body
        }
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
          <Col xs={12} md={3}>
            <Row className="justify-content-center">
              <Col xs="auto">
                <Thumbnail />
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col className="text-nowrap" xs="auto">
                <Socials style={{width: '140px'}}/>
              </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
              <Col className="text-nowrap" style={{ alignItems: 'center' }} xs="auto">
                <BlogInfo />
              </Col>
            </Row>
          </Col>
          <Col>
            <br />
            <StaticQuery
              query={aboutQuery}
              render={data => (
                <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
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
