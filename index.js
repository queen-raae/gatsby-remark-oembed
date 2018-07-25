const {
  selectPossibleOembedLinks,
  tranformsLinkNodeToOembedNode
} = require("./helpers");

module.exports = ({ markdownAST }) => {
  // Step 2: Find link nodes in markdown structure that are on their own, not part of some other content.
  let possibleOmbedUrlNodes = selectPossibleOembedLinks(markdownAST);
  // For each node
  possibleOmbedUrlNodes.map(node => {
    // Step 3: Check if url matched any of the oembed url schemes.
    // Step 4: Fetch the oembed response from the oembed provider.
    // 5.  Transform the link node into an html node using html value from the oembed response.
    tranformsLinkNodeToOembedNode(node, {
      html: "HTML as told to us by the oembed response"
    });
  });
  return markdownAST;
};
