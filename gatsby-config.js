module.exports = {
    siteMetadata: {
      title: `6 Nations Calendar 🏉`,
      description: `6 Nations kick-off times available in open formats including RSS, ICS and JSON`,
      siteUrl: `https://6nationscalendar.com`,
      author: `@si`,
    },
    plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#006600`,
        theme_color: `#FFCCFF`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          'Michroma',
          //`source sans pro\:300,400,400i,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content`,
      },
    },

    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  title: edge.node.frontmatter.title,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
                  //custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      frontmatter {
                        title
                        date
                        path
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed.xml",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            //match: "^/blog/",
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-csv-feed",
      options: {
        // Query to pass to all feed serializers (optional)
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
          }
        `,
        // Feeds
        feeds: [
          {
            query: `
              {
                allMarkdownRemark {
                  edges {
                    node {
                      frontmatter {
                        title
                        date
                        locationName
                      }
                      fields {
                        slug
                      }
                      excerpt
                    }
                  }
                }
              }
            `,
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                const node = Object.assign({}, edge.node.frontmatter, edge.node.fields);
                return {
                  "Title": node.title,
                  "Date": node.date,
                  "Location": node.locationName,
                  "Description": edge.node.excerpt,
                  "Details URL": `${site.siteMetadata.siteUrl}${node.slug}`,
                };
              });
            },
            output: "/events.csv",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-posthog`,
      options: {
        // Specify the API key for your Posthog Project (required)
        apiKey: "phc_41ZsUKuOh9odm6GDZcLzPfixBQut7amfmHC6zze1rVy",
        // Specify the app host if self-hosting (optional, default: https://app.posthog.com)
        apiHost: "https://eu.i.posthog.com",
        // Puts tracking script in the head instead of the body (optional, default: true)
        head: true,
        // Enable posthog analytics tracking during development (optional, default: false)
        isEnabledDevMode: true
        // Pass custom variables to posthog.init() (optional)
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
