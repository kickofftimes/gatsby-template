import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import LocalTimezone from "../components/local-timezone"

// Utilities
import Moment from "moment"
import kebabCase from "lodash/kebabCase"

export default function Template({ data }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  const tags = frontmatter.tags 

  return (
    <Layout>
      <SEO title={frontmatter.title} />
      <div className="event-post">
        <h1>{frontmatter.title}</h1>
        <h2>When?</h2>
          <p className="date">{Moment(frontmatter.date).format("dddd DD MMMM YYYY")}</p>
          <p className="time">
            {Moment(frontmatter.date).format("hh:mma") + (frontmatter.endDate ? "-" + Moment(frontmatter.endDate).format("hh:mma") : "") }
          </p>
          {LocalTimezone}
        <h2>Where?</h2>
        <p>{frontmatter.locationName}</p>

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <h2>Want more?</h2>
        <ul className="inline">
        { 
          tags ? 
          tags.map(tag => (
            <li key={tag.fieldValue}>
            <Link to={`/${kebabCase(tag)}/`}>{tag} games</Link>
          </li>
          )) : ''
        }
        <li><Link to="/"><span role="img" aria-label="Spiral calendar">📅</span>
          All games</Link></li>
        </ul>

      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date
        endDate
        path
        title
        locationName
        tags
      }
    }
  }
`
