const Promise = require("bluebird");

const {
  amendOptions,
  fetchOembed,
  getProviderEndpointForLinkUrl,
  getProxyAgent,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  logResults
} = require("./utils");

module.exports = async (
  { markdownAST, markdownNode, cache, reporter },
  rawOptions
) => {
  try {
    const options = amendOptions(rawOptions);
    const proxyAgent = getProxyAgent(options.useProxy, reporter);
    const providers = (await cache.get("remark-oembed-providers")) || [];

    const nodes = selectPossibleOembedLinkNodes(markdownAST, options.usePrefix);

    if (nodes.length > 0) {
      const results = await Promise.all(
        nodes.map(node => processNode(node, providers, proxyAgent))
      );
      logResults(results, markdownNode, reporter);
    }
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Error processing links`, error);
  }
};

// For each node this is the process
const processNode = async (node, providers, proxyAgent) => {
  try {
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers);
    if (endpoint.url) {
      const oembedResponse = await fetchOembed(endpoint, proxyAgent);
      return tranformsLinkNodeToOembedNode(node, oembedResponse);
    }
  } catch (error) {
    error.url = node.url;
    return error;
  }
};
