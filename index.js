const Promise = require(`bluebird`);

const {
  fetchOembedProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinks,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

const processNode = async (node, providers) => {
  const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);

  if (!endpointUrl) {
    return;
  }

  const oembedResponse = await fetchOembed(node.url, endpointUrl);
  return tranformsLinkNodeToOembedNode(node, oembedResponse);
};

const processNodes = (nodes, providers) => {
  return Promise.all(
    nodes.map(node => processNode(node, providers))
  );
};

module.exports = async ({ markdownAST }) => {
  // Step 2: Find link nodes in markdown structure that are on their own, not part of some other content.
  const possibleOmbedUrlNodes = selectPossibleOembedLinks(markdownAST);
  const providers = await fetchOembedProviders();
  return processNodes(possibleOmbedUrlNodes, providers);
};
