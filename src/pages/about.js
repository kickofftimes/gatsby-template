import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h2 id="MissionStatement">Providing sports event data in open formats for easier consumption</h2>
    <ul id="Goals">
      <li><span role="img" aria-label="Scales">⚖️</span> Democratise sports event data</li>
      <li><span role="img" aria-label="Scroll">📜</span> Establish reusable relevant standards</li>
      <li><span role="img" aria-label="Toolbox">🧰</span> Distribution through custom apps</li>
      <li><span role="img" aria-label="Silhouette heads">👥</span> Build a community of evangelists</li>      
    </ul>
    <h2 id="What">What is this?</h2>
    <p>The Sports Times is a Gatsby boilerplate template to fulfil our mission statement. It publishes dates, times &amp; locations using standards that most tech platforms understand.</p>
    <dl>
      <dt><span role="img" aria-label="Calendar">📆️</span> <acronym title="iCalendar file">ICS</acronym></dt>
      <dd>Calendar feeds directly into macOS, iOS, Google Android, Microsoft Windows &amp; Office</dd>
      <dt><span role="img" aria-label="Satellite">📡</span> <acronym title="Really Simple Syndication">RSS</acronym></dt>
      <dd>Really Simple Syndication for content aggregators, online and native apps</dd>
      <dt><span role="img" aria-label="Document">📄</span> <acronym title="Comma seperated values">CSV</acronym></dt>
      <dd>Comma-separated content for personal use in the likes of Excel</dd>
    </dl>
    <h3 id="How">How do you use it?</h3>
    <p>If you want to publish your own calendar of events for others to reference with ease, <a href="https://github.com/sportstimes/gatsby-template">clone the repo</a>, customise to your hearts content and host on your own website or domain.</p>
    <p>It's an <a href="https://github.com/sportstimes/gatsby-template">open-source project on Github</a> for others to use and improve. Fork it, use it, raise a pull-request with your suggestions or simply <a href="https://github.com/sportstimes/gatsby-template/issues">raise an issue</a> with ideas or problems.</p>
  </Layout>
)

export default AboutPage