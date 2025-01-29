/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const _ = require("lodash")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/post.js`)
  const listTemplate = path.resolve("src/templates/list.js")
  
  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              path
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }      
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.postsRemark.edges
  // Create post detail pages
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/${_.kebabCase(tag.fieldValue)}/`,
      component: listTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })  
}

// RSS Feed generation
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// ICS generation
const { writeFileSync } = require(`fs`)

exports.onPostBuild = async ({ graphql }) => {
  
  console.log('Generating ICS……');
  
  const ics = require(`ics`)
  const moment = require(`moment`)
  let events = []

  const result = await graphql(`
  {
    event: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            endDate
            locationName
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    siteMeta: site {
      siteMetadata {
        title
        siteUrl
      }
    }
  }
  `)

  if (result.errors) {
    console.log(result.errors)
    throw new Error("GraphQL fail, see console output above")
  }

  result.data.event.edges.forEach(({ node }) => {
    let start = moment(node.frontmatter.date)
    let startDate = [
      start.year(),
      (start.month()+1),
      start.date(),
      start.hour(),
      start.minutes()
    ];
    
    let event = {
      start: startDate,
      title: node.frontmatter.title,
      description: node.excerpt,
      location: node.frontmatter.locationName,
      url: result.data.siteMeta.siteMetadata.siteUrl + node.fields.slug,
      status: 'CONFIRMED',
    }
    if(node.frontmatter.endDate) {
      let end = moment(node.frontmatter.endDate)
      let endDate = [
        end.year(),
        (end.month()+1),
        end.date(),
        end.hour(),
        end.minutes()
      ];
  
      event.end = endDate
    } else {
      event.duration = { hours: 2, minutes: 0 }
    }
    events.push(event)
  })
  
  ics.createEvents(events, (error, value) => {
    if (error) {
      console.log(error)
      throw new Error("ICS generation fail, see console output above")
    }
  
    //console.log(value)  
    writeFileSync(`${__dirname}/public/events.ics`, value)

  })

}
