const select = require("unist-util-select");

const selectPossibleOembedLinkNodes = (markdownAST, usePrefix = false) => {
  if (!usePrefix) {
    return select(markdownAST, "paragraph link:only-child");
  } else {
    const inlineCodeNodes = select(markdownAST, "inlineCode");
    return inlineCodeNodes
      .filter(inlineCodeNode => {
        // Returns true if the value starts with any of the prefixes
        return usePrefix.find(prefix =>
          inlineCodeNode.value.startsWith(prefix)
        );
      })
      .map(inlineCodeNode => {
        // Remove everything before first ":"
        inlineCodeNode.url = inlineCodeNode.value.split(":");
        inlineCodeNode.url.shift();
        inlineCodeNode.url = inlineCodeNode.url.join(":").trim();
        return inlineCodeNode;
      });
  }
};

module.exports = selectPossibleOembedLinkNodes;
