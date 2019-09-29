import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Layout from "../components/layout"
import { Card, CardDeck, Row, Col, Container } from "react-bootstrap"

class About extends React.Component {
  render() {
    return (
      <Layout title="Posts">
        <Container fluid={true}>
          <br />
          <Row>
            <Col>
                <StaticQuery
                  query={graphql`
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
                  `}
                  render={data => (
                    <CardDeck className="justify-content-sm-center justify-content-md-around">
                      {data.allMdx.edges.map(({ node }, i) => (
                      <Link
                        to={node.fields.slug}
                        style={{ textDecoration: "none" }}
                      >
                        <Card style={{ height: '25rem', width: '24rem' }}>
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
                    ))}</CardDeck>
                  )}
                />
            </Col>
          </Row>
          <br /><br />
        </Container>
      </Layout>
    )
  }
}

export default About;
