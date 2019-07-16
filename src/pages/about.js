import React from 'react'
import Layout from '../components/layout'
import { Container } from 'react-bootstrap';
import { graphql, StaticQuery } from "gatsby"
import MDXRenderer from "gatsby-mdx/mdx-renderer";

class About extends React.Component {
  render() {
    return (
      <Layout>
        <br />
        <br />
        <Container>
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
        </Container>
      </Layout>
    )
  }
}

export default About;