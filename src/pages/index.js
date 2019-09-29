import React from 'react'
import Layout from '../components/layout'
import { Container, Col, Row, Image } from 'react-bootstrap';
import { graphql, StaticQuery } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { TwitterTimelineEmbed } from "react-twitter-embed"
import Thumb from "../images/thumb.jpg"
import { SocialIcon } from 'react-social-icons';

const thumbStyle = {
  width: '100%',
  height: 'auto',
  maxWidth: '300px',
}

class IndexPage extends React.Component {
  render() {
    return (
      <Layout title="Home">
        <br />
        <br />
		  <Row>
		  <Col
		    sm={12} md={3}
		    style={{marginLeft: '10px'}}
		  >
		  <Col className="justify-content-center" style={{width: '100%', display: 'flex'}} xs={12}>
          <Image
		    style={thumbStyle}
            src={Thumb}
            alt="me"
            title="me"
			roundedCircle
          />
		  </Col>
		  <br />
		  <Col className="justify-content-center" style={{width: '100%', display: 'flex'}} xs={12}>
		  <SocialIcon url="https://www.linkedin.com/in/paul-semel/" style={{marginRight: '5px'}}/>
		  <SocialIcon url="https://github.com/paulsemel" style={{marginRight: '5px'}}/>
		  <SocialIcon url="https://twitter.com/semel_paul" />
		  </Col>
		  </Col>
		  <Col style={{marginLeft: '10px', marginRight: '10px'}}>
          <StaticQuery
            query={graphql`
              query AboutQuery {
                mdx(
                  fileAbsolutePath: {regex: "/.*pages/about.*/i"}
                  ) {
                      code {
                        body
                      }
                    }
              }
            `}
            render={data => (
              <MDXRenderer>{data.mdx.code.body}</MDXRenderer>
            )}
            />
			</Col>
			</Row>
      </Layout>
    )
  }
}

export default IndexPage
