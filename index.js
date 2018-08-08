const Promise = require("bluebird");

const {
  fetchOembedProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST }) => {
  // Step 1.  Fetch the oembed provider list.
  const providers = await fetchOembedProviders();

  // Step 2.  Find link nodes in markdown structure that are on their own, not part of some other content.
  const possibleOmbedUrlNodes = selectPossibleOembedLinkNodes(markdownAST);

  return processNodes(possibleOmbedUrlNodes, providers);
};

const processNodes = (nodes, providers) => {
  return Promise.all(nodes.map(node => processNode(node, providers)));
};

// For each node this is the process
const processNode = async (node, providers) => {
  // Step 3.  Check if url matched any of the oembed url schemes.
  const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);

  if (!endpointUrl) {
    return;
  }

  // Step 4.  Fetch the oembed response from the oembed provider.
  const oembedResponse = await fetchOembed(node.url, endpointUrl);

  // Step 5.  Transform the link node into an html node.
  return tranformsLinkNodeToOembedNode(node, oembedResponse);
};
