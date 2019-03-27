const Promise = require("bluebird");

const {
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST, cache, reporter }, rawOptions) => {
  try {
    const {usePrefix = false} = rawOptions;
    const providers = await cache.get("remark-oembed-providers");

    const nodes = selectPossibleOembedLinkNodes(markdownAST, usePrefix);

    await Promise.all(nodes.map(node => processNode(node, providers, reporter)));
  } catch (error) {
    reporter.info(`Remark oembed plugin error: ${error.message}`);
  }
};

// For each node this is the process
const processNode = async (node, providers, reporter) => {
  try {
    reporter.info(`Process node ${node.url}`);
    // Check if url matched any of the oembed url schemes.
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers, reporter);
    reporter.info(`With oembed request ${JSON.stringify(endpoint)}`);
    // Fetch the oembed response from the oembed provider.
    const oembedResponse = await fetchOembed(endpoint);
    // Transform the link node into an html node.
    tranformsLinkNodeToOembedNode(node, oembedResponse);
  } catch (error) {
    reporter.error(error.message);
  }
};
