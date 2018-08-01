const Promise = require("bluebird");

const {
  fetchOembedProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = ({ markdownAST }) => {
  // Step 1.  Fetch the oembed provider list.
  return fetchOembedProviders().then(providers => {
    // Step 2.  Find link nodes in markdown structure that are on their own, not part of some other content.
    const oembedLinkNodes = selectPossibleOembedLinkNodes(markdownAST);

    // For each node this is the process
    const oembedLinkNodesPromises = oembedLinkNodes.map(node => {
      // Step 3.  Check if url matched any of the oembed url schemes.
      const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);

      return (
        endpointUrl &&
        // Step 4.  Fetch the oembed response from the oembed provider.
        fetchOembed(node.url, endpointUrl).then(response => {
          // Step 5.  Transform the link node into an html node.
          return tranformsLinkNodeToOembedNode(node, response);
        })
      );
    });

    // Wait until all of the nodes are done
    return Promise.all(oembedLinkNodesPromises);
  });
};
