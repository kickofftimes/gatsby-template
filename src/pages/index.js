import React from "react"
import { graphql } from "gatsby"
import EventRow from "../components/event-row"
import LocalTimezone from "../components/local-timezone"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  const currentDate = new Date();
  const Events = edges
    .filter(edge => new Date(edge.node.frontmatter.date) >= currentDate)
    .map(edge => <EventRow key={edge.node.id} post={edge.node} />)

  return (
    <Layout>

      <SEO title="2025 games" />
      <h2>2025 games</h2>
  		<p>
        <a href="webcal://6nationscalendar.com/events.ics" className="ics">
          <span role="img" aria-label="Spiral calendar">🗓</span> 
          Subscribe to all event times in iOS, MacOS and Office
        </a>
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

      <script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="si" data-description="Support me on Buy me a coffee!" data-message="Thanks for using 6 Nations Calendar. If you've found it useful, why not buy Si a beer?" data-color="#40DCA5" data-position="Right" data-x_margin="18" data-y_margin="18"></script>

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
        <span role="img" aria-label="Download">⬇️</span>
        Export as 
        {` `}
        <a href="/events.ics" download="download">ICS</a>,
        {` `}
        <a href="/feed.xml">RSS feed</a>
        {` and `}
        <a href="/events.csv" download="download">CSV file</a>
      </p>
     </Layout>
  )
}

export default IndexPage
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
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
