const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Create mdx posts

  const mdxResults = await graphql(
    `
      {
        allMdx(
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

  if (mdxResults.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" mdx query');
  }

  // Create blog posts pages.
  const mdxPosts = mdxResults.data.allMdx.edges;
  const mdxPostTemplate = path.resolve("./src/templates/mdx-post.js");

  mdxPosts.forEach(({ node }, index) => {
    const previous =
      index === mdxPosts.length - 1 ? null : mdxPosts[index + 1].node;
    const next = index === 0 ? null : mdxPosts[index - 1].node;

    createPage({
      path: node.fields.slug,
      component: mdxPostTemplate,
      context: {
        slug: node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "Mdx") {
    const relativeFilePath = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: `/${relativeFilePath}`,
    });
  }
};
