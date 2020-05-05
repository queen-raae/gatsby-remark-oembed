const Promise = require("bluebird");

const {
  amendOptions,
  fetchOembed,
  fetchPreview,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  transformLinkNodeToPreviewNode,
  logResults,
  getProviders
} = require("./utils");

module.exports = async (
  { markdownAST, markdownNode, cache, reporter },
  rawOptions
) => {
  try {
    const options = amendOptions(rawOptions);
    const providers =
      (await getProviders({ cache, reporter }, rawOptions)) || [];

    const nodes = selectPossibleOembedLinkNodes(markdownAST, options.usePrefix);

    if (nodes.length > 0) {
      const results = await Promise.all(
        nodes.map(node =>
          processNode(node, providers, reporter, options.unfurl)
        )
      );
      logResults(results, markdownNode, reporter);
    }
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Error processing links`, error);
  }
};

// For each node this is the process
const processNode = async (node, providers, reporter, unfurl) => {
  try {
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers);
    if (endpoint.url) {
      const oembedResponse = await fetchOembed(endpoint);
      return tranformsLinkNodeToOembedNode(node, oembedResponse);
    } else if (unfurl) {
      const metaData = await fetchPreview(node.url);
      return transformLinkNodeToPreviewNode(node, metaData);
    }
  } catch (error) {
    error.url = node.url;
    return error;
  }
};
