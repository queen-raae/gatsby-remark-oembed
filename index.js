const Promise = require("bluebird");

const {
  amendOptions,
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  logResults
} = require("./utils");
const { getProviders } = require("./getProviders");

module.exports = async (
  { markdownAST, markdownNode, cache, reporter },
  rawOptions
) => {
  try {
    const options = amendOptions(rawOptions);
    const providers = (await getProviders(cache)) || [];

    console.log({ options, providers });
    // console.log(markdownAST);

    const nodes = selectPossibleOembedLinkNodes(markdownAST, options.usePrefix);

    // console.log("----");
    // console.log(nodes); // this prints a youtube link node

    if (nodes.length > 0) {
      const results = await Promise.all(
        nodes.map(node => processNode(node, providers, reporter))
      );
      //   console.log("----");
      console.log(results); // this prints [ undefined ]
      logResults(results, markdownNode, reporter);
    }
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Error processing links`, error);
  }
};

// For each node this is the process
const processNode = async (node, providers) => {
  try {
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers);
    // console.log({ endpoint });
    if (endpoint.url) {
      const oembedResponse = await fetchOembed(endpoint);
      //   console.log({ oembedResponse });
      return tranformsLinkNodeToOembedNode(node, oembedResponse);
    }
  } catch (error) {
    error.url = node.url;
    return error;
  }
};
