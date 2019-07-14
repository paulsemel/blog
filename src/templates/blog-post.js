import React from 'react';
import BlogNav from '../blognav'
import {Container} from 'react-bootstrap'
import { graphql } from 'gatsby'
import MDXRenderer from "gatsby-mdx/mdx-renderer";

function BlogPost(props) {
    const post = props.data.mdx;
    const { title,date } = post.frontmatter;

    return (
            <div>
                <BlogNav />
                <br />
                <Container>
                    <h1>{title}</h1>
                    <MDXRenderer>{post.code.body}</MDXRenderer>
                </Container>
            </div>
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