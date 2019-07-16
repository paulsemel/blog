const path = require("path")
const { createFilePath, createFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions

    const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

    return new Promise((resolve, reject) => {

        resolve(
          graphql(`
            {
              allMdx(
                filter: {fileAbsolutePath: {regex: "/.*posts.*/i"}}
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
              ) {
                edges {
                  node {
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                    }
                  }
                }
              }
            }
          `).then(result => {
            if (result.errors) {
              console.log(result.errors)
              return reject(result.errors)
            }

            const blogTemplate = path.resolve("./src/templates/blog-post.js")

            result.data.allMdx.edges.forEach(({ node }) => {
              createPage({
                path: node.fields.slug,
                component: blogTemplate,
                context: {
                  slug: node.fields.slug,
                }, // additional data can be passed via context
              })
            })
            return
          })
        )
    })
}


exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `Mdx`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
        console.log("Worked")
    }
}