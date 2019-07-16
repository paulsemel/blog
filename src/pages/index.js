import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Card, CardDeck, Row, Col, Container } from "react-bootstrap"
import { TwitterTimelineEmbed } from "react-twitter-embed"

class IndexPage extends React.Component {
  render() {
    const postList = this.props.data.allMdx
    return (
      <Layout>
        <Container fluid={true}>
          <br />
          <Row>
            <Col md={{ span: 9 }} style={{paddingLeft: '10px'}}>
              <CardDeck className="justify-content-sm-center justify-content-md-between">
              {postList.edges.map(({ node }, i) => (
                  <Link
                    to={node.fields.slug}
                    style={{ textDecoration: "none" }}
                  >
                    <Card style={{ height: '20rem', width: '22rem' }}>
                      <Card.Body>
                        <Card.Title>{node.frontmatter.title}</Card.Title>
                        <Card.Text>{node.excerpt}</Card.Text>
                      </Card.Body>
                      <Card.Footer className="text-muted">
                        {node.frontmatter.author} - Posted {node.frontmatter.date} - {node.timeToRead} min read
                      </Card.Footer>
                    </Card>
                    <br />
                  </Link>
              ))}
              </CardDeck>
            </Col>
            <Col md={{ span: 3 }}
                 className="justify-content-center"
                 style={{display: 'flex'}}>
              <div style={{maxWidth: '500px', minWidth: '200px'}}>
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="semel_paul"
                  options={{ height: 800 }}
                />
              </div>
            </Col>
          </Row>
          <br /><br />
        </Container>
      </Layout>
    )
  }
}

export default IndexPage

export const listQuery = graphql`
  query ListQuery {
    allMdx(
      filter: {fileAbsolutePath: {regex: "/.*posts.*/i"}}
      sort: { order: DESC, fields: [frontmatter___date] }
      ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(fromNow: true)
            title
            description
            author
          }
          timeToRead
        }
      }
    }
  }
`
