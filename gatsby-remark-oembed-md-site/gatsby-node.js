const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Create markdown posts

  const mdResults = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
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
    `
  );

  if (mdResults.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" md query');
  }

  // Create blog posts pages.
  const mdPosts = mdResults.data.allMarkdownRemark.edges;
  const mdPostTemplate = path.resolve("./src/templates/md-post.js");

  mdPosts.forEach(({ node }, index) => {
    const previous =
      index === mdPosts.length - 1 ? null : mdPosts[index + 1].node;
    const next = index === 0 ? null : mdPosts[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: mdPostTemplate,
      context: {
        slug: node.fields.slug,
        previous,
        next
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const relativeFilePath = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `${relativeFilePath}`
    });
  }
};
