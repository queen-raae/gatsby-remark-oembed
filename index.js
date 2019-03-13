const Promise = require("bluebird");

const {
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST, cache }) => {
  try {
    const providers = await cache.get("remark-oembed-providers");
    const nodes = selectPossibleOembedLinkNodes(markdownAST);
    await processNodes(nodes, providers);
  } catch (error) {
    console.log(`Remark oembed plugin error: ${error.message}`);
  }
};

const processNodes = async (nodes, providers) => {
  return Promise.all(nodes.map(node => processNode(node, providers)));
};

// For each node this is the process
const processNode = async (node, providers) => {
  try {
    console.log(`Process node ${node.url}`);
    // Check if url matched any of the oembed url schemes.
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers);
    console.log(`With oembed request ${JSON.stringify(endpoint)}`);
    // Fetch the oembed response from the oembed provider.
    const oembedResponse = await fetchOembed(endpoint);
    // Transform the link node into an html node.
    tranformsLinkNodeToOembedNode(node, oembedResponse);
  } catch (error) {
    console.log(error.message);
  }
};
