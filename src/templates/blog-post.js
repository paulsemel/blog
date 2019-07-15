import React from 'react';
import Layout from '../components/layout'
import {Container} from 'react-bootstrap'
import { graphql } from 'gatsby'
import MDXRenderer from "gatsby-mdx/mdx-renderer";

const style = {
    fontFamily: 'Roboto'
}

function BlogPost(props) {
    const post = props.data.mdx;
    const { title,date } = post.frontmatter;

    return (
                <Layout>
                <br />
                <br />
                <Container style={style}>
                    <h1>{title}</h1> <hr/>
                    <br />
                    <MDXRenderer>{post.code.body}</MDXRenderer>
                </Container>
                </Layout>
    )
}

export default BlogPost

export const query = graphql`

query PostQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
        code {
            body
        }
        excerpt
        frontmatter {
            title
        }
    }
}`