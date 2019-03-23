const Promise = require("bluebird");
const visit = require("async-unist-util-visit");

const {
  fetchOembed,
  getProviderEndpointForLinkUrl,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = async ({ markdownAST, cache }) => {
  try {
    // Adding promises
    let promises = []
    const providers = await cache.get("remark-oembed-providers");

    // Get query for inline code
    await visit(markdownAST, "inlineCode", async node => {
      // Reject if not start with oembed:
      if (!node.value.startsWith("oembed:")) return;

      // Extract URL
      node.url = node.value.substring(7);

      // Push to promise
      promises.push(processNode(node, providers))
    })
    // Wait for all Promises to complete
    await Promise.all(promises)
  }
  catch (error) {
    console.log(`Remark oembed plugin error: ${error.message}`);
  }
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
