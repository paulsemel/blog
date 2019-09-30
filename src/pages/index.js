import React from 'react'
import Layout from '../components/layout'
import { Col, Row } from 'react-bootstrap';
import { graphql, StaticQuery } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import Thumbnail from '../components/thumbnail'
import Socials from '../components/socials';

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
          <Col
            xs={12} md={3}
            style={{ marginLeft: '5px', marginRight: '5px' }}
          >
            <Col className="justify-content-center" style={{ width: '100%', display: 'flex' }} xs={12}>
              <Thumbnail />
            </Col>
            <br />
            <Col className="justify-content-center" style={{ width: '100%', display: 'flex' }} xs={12}>
              <Socials />
            </Col>
          </Col>
          <Col style={{ marginLeft: '10px', marginRight: '10px' }}>
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
