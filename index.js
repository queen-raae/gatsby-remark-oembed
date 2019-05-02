const Promise = require("bluebird")

const {
  fetchOembed,
  getProviderEndpointForLinkUrl,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  logResults
} = require("./helpers")

module.exports = async ({ markdownAST, cache, reporter }, rawOptions) => {
  try {
    const { usePrefix = false } = rawOptions
    const providers = (await cache.get("remark-oembed-providers")) || []

    const nodes = selectPossibleOembedLinkNodes(markdownAST, usePrefix)
    const results = await Promise.all(
      nodes.map(node => processNode(node, providers, reporter))
    )
    logResults(results, reporter)
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Error processing links`, error)
  }
}

// For each node this is the process
const processNode = async (node, providers) => {
  try {
    const endpoint = getProviderEndpointForLinkUrl(node.url, providers)
    if (endpoint.url) {
      const oembedResponse = await fetchOembed(endpoint)
      return tranformsLinkNodeToOembedNode(node, oembedResponse)
    }
  } catch (error) {
    error.url = node.url
    return error
  }
}
