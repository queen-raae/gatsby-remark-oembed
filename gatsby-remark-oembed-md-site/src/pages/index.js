import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/PageLayout";

const BlogIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout title="gatsby-remark-oembed example">
      {posts.map(({ node }) => {
        return (
          <article key={node.fields.slug}>
            <h1>
              <Link style={{ boxShadow: "none" }} to={node.fields.slug}>
                {node.frontmatter.title}
              </Link>
            </h1>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </article>
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
