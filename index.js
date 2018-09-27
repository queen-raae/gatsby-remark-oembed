const Promise = require("bluebird");

const {
  ammendOptions,
  ammendProviders,
  filterProviders,
  fetchOembedProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST }, options) => {
  options = ammendOptions(options);

  try {
    // Step 1.  Fetch the oembed provider list.
    let providers = await fetchOembedProviders();
    providers = ammendProviders(providers);

    providers = filterProviders(providers, options.providers);

    // Step 2.  Find link nodes in markdown structure that are on their own, not part of some other content.
    const possibleOmbedUrlNodes = selectPossibleOembedLinkNodes(markdownAST);

    return processNodes(possibleOmbedUrlNodes, providers);
  } catch (error) {
    console.log(`Remark oembed plugin error: ${error.message}`);
  }
};

const processNodes = (nodes, providers) => {
  return Promise.all(nodes.map(node => processNode(node, providers)));
};

// For each node this is the process
const processNode = async (node, providers) => {
  try {
    console.log(`Process ${node.url}`);
    // Step 3.  Check if url matched any of the oembed url schemes.
    const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);

    // Step 4.  Fetch the oembed response from the oembed provider.
    const oembedResponse = await fetchOembed(node.url, endpointUrl);

    // Step 5.  Transform the link node into an html node.
    return tranformsLinkNodeToOembedNode(node, oembedResponse);
  } catch (error) {
    console.log(error.message);
  }
};
