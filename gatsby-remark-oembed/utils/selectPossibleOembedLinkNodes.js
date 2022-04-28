const visitParents = require("unist-util-visit-parents");

const selectPossibleOembedLinkNodes = (markdownAST, usePrefix = false) => {
  const possibleOembedLinkNodes = [];

  if (!usePrefix) {
    visitParents(markdownAST, "link", (node, ancestors) => {
      if (
        // Parent must be root paragraph
        ancestors.length === 2 &&
        ancestors[1].type === "paragraph" &&
        // Parent paragraph to contain only link
        ancestors[1].children.length === 1 &&
        // Complex link children not allowed
        node.children.length === 1 &&
        node.children[0].type === "text"
      ) {
        possibleOembedLinkNodes.push({
          node: ancestors[1],
          url: node.url,
        });
      }
    });
  } else {
    visitParents(markdownAST, "inlineCode", (node) => {
      const [prefix, ...rest] = node.value.split(":");
      if (usePrefix.includes(prefix.trim())) {
        possibleOembedLinkNodes.push({
          node: node,
          url: rest.join(":").trim(),
        });
      }
    });
  }

  return possibleOembedLinkNodes;
};

module.exports = selectPossibleOembedLinkNodes;
