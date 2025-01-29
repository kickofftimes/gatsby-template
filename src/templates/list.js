import React from "react"
import { graphql, Link } from "gatsby"
import EventRow from "../components/event-row"
import LocalTimezone from "../components/local-timezone"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  pageContext,
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const { tag } = pageContext

  const Events = edges
    .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)
  const listHeader = `${tag} games`
  
  return (
    <Layout>
      <SEO title={listHeader} />
      <h1>{listHeader}</h1>

      <p>
        <span role="img" aria-label="Spiral calendar">🗓</span> 
        <a href="webcal://6nationscalendar.com/events.ics" className="ics">Subscribe to ALL match times in your iOS, MacOS and Office calendar</a> 
        <small
          style={{
            display: `block`,
          }}
        >
          or 
          {` `}
          <a href="https://support.google.com/calendar/answer/37100?hl=en">Google Calendar</a>
        </small>
      </p>

      {LocalTimezone}

      <table>
        <thead>
          <tr>
            <th>Summary</th>
            <th>When</th>
            <th class="location">Where</th>
            <th class="description" style={{display:`none`}}>What</th>
          </tr>
        </thead>
        <tbody>
          {Events}
        </tbody>
      </table>
      <p>
        <Link to="/">All games</Link>
      </p>
     </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date
            path
            title
            locationName
          }
        }
      }
    }
  }
` 
