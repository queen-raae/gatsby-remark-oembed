const {
  amendOptions,
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  logResults,
  getProviders,
} = require("./utils");

module.exports = async (gatsbyUtils, rawOptions) => {
  const { markdownAST, markdownNode, reporter } = gatsbyUtils;

  try {
    const options = amendOptions(rawOptions);
    const providers = await getProviders(gatsbyUtils, options);
    const nodes = selectPossibleOembedLinkNodes(markdownAST, options.usePrefix);

    if (nodes.length > 0) {
      const results = await Promise.all(
        nodes.map((node) => processNode(node, providers, reporter))
      );
      logResults(results, markdownNode, reporter);
    }
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Error processing links`, error);
  }
};

// For each node this is the process
const processNode = async (node, providers) => {
  try {
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers);

    if (endpoint.url) {
      const oembedResponse = await fetchOembed(endpoint);
      return tranformsLinkNodeToOembedNode(node, oembedResponse);
    }
  } catch (error) {
    error.url = node.url;
    return error;
  }
};
