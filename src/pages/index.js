import React from 'react'
import { Link, graphql } from 'gatsby'
import BlogNav from '../blognav'

const IndexPage = (props) => {
  const postList = props.data.allMdx;
  return (
    <div>
      <BlogNav />
      {postList.edges.map(({ node }, i) => (
        <Link to={node.fields.slug} key={i} className="link">
          <div className="post-list">
            <h1>{node.frontmatter.title}</h1>
            <span>{node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
          }
        }
      }
    }
  }
`