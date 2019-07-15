import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Card, Button, Row, Col, Container } from "react-bootstrap"
import { TwitterTimelineEmbed } from "react-twitter-embed"

class IndexPage extends React.Component {
  render() {
    const postList = this.props.data.allMdx
    return (
      <Layout>
        <Container fluid={true}>
          <br à/>
          <br />
          <Row>
            <Col md={{span: 6, offset: 1}}>
              {postList.edges.map(({ node }, i) => (
                //<Row>
                  <Col md={{ span: 6 }} style={{ display: "inline-block"}}>
                    <Link
                      to={node.fields.slug}
                      style={{ textDecoration: "none"}}
                    >
                      <Card style={{height: '20rem'}}>
                        <Card.Body>
                          <Card.Title>{node.frontmatter.title}</Card.Title>
                          <Card.Text>{node.excerpt}</Card.Text>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          {node.frontmatter.date} - {node.frontmatter.author}
                        </Card.Footer>
                      </Card>
                      <br />
                    </Link>
                  </Col>
                //</Row>
              ))}
            </Col>
            <Col md={{ span: 3, offset: 1 }}>
              <TwitterTimelineEmbed
                sourceType="profile"
                screenName="semel_paul"
                options={{ height: 800 }}
              />
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
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
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
        }
      }
    }
  }
`
