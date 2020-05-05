module.exports = {
  siteMetadata: {
    title: "gatsby-remark-oembed plugin example site",
    author: "raae.codes",
    description: "A site demonstrating the gatsby-remark-oembed plugin",
    siteUrl: "https://gatsby-remark-oembed.netlify.com/"
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: "posts"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              unfurl: true,
              providers: {
                settings: {
                  Twitter: {
                    theme: "dark" // Use the Twitter dark theme
                  },
                  Instagram: {
                    hidecaption: true
                  }
                }
              }
            }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          }
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography"
      }
    }
  ]
};
