const Promise = require("bluebird");
const { createFilePath } = require("gatsby-source-filesystem");

const {
  ammendOptions,
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  logResults
} = require("./utils");

module.exports = async (
  { markdownAST, markdownNode, getNode, cache, reporter },
  rawOptions
) => {
  try {
    const options = ammendOptions(rawOptions);
    const providers = (await cache.get("remark-oembed-providers")) || [];

    const nodes = selectPossibleOembedLinkNodes(markdownAST, options.usePrefix);

    if (nodes.length > 0) {
      const path = createFilePath({ node: markdownNode, getNode });
      const results = await Promise.all(
        nodes.map(node => processNode(node, providers, reporter))
      );
      logResults(results, path, reporter);
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
