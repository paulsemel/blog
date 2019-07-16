import React from 'react'
import Layout from '../components/layout'
import { Container } from 'react-bootstrap';
import MDXRenderer from "gatsby-mdx/mdx-renderer";

class About extends React.Component {
  render() {
    const page = this.props.data.mdx;
    return (
      <Layout>
        <br />
        <br />
        <Container>
          <MDXRenderer>{page.code.body}</MDXRenderer>
        </Container>
      </Layout>
    )
  }
}

export default About;

export const AboutPage = graphql`
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