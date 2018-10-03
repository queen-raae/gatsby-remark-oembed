const Promise = require("bluebird");
// const rawProviders = require("./providers.json");

const {
  ammendOptions,
  ammendProviders,
  filterProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST, cache }, rawOptions) => {
  try {
    const providers = await cache.get("oembed-providers");
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
    // Step 3.  Check if url matched any of the oembed url schemes.
    const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);
    // Step 4.  Fetch the oembed response from the oembed provider.
    const oembedResponse = await fetchOembed(node.url, endpointUrl);
    // Step 5.  Transform the link node into an html node.
    tranformsLinkNodeToOembedNode(node, oembedResponse);
  } catch (error) {
    console.log(error.message);
  }
};
