const Promise = require(`bluebird`);

const {
  fetchOembedProviders,
  fetchOembed,
  getProviderEndpointUrlForLinkUrl,
  selectPossibleOembedLinks,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

const nodePromise = (node, providers) => {
  const endpointUrl = getProviderEndpointUrlForLinkUrl(node.url, providers);
  return (
    endpointUrl &&
    fetchOembed(node.url, endpointUrl).then(response => {
      return tranformsLinkNodeToOembedNode(node, response);
    })
  );
};

module.exports = ({ markdownAST }) => {
  // Step 2: Find link nodes in markdown structure that are on their own, not part of some other content.
  const possibleOmbedUrlNodes = selectPossibleOembedLinks(markdownAST);

  return fetchOembedProviders().then(providers => {
    return Promise.all(
      possibleOmbedUrlNodes.map(node => nodePromise(node, providers))
    );
  });
};
