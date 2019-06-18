const select = require("unist-util-select");

const selectPossibleOembedLinkNodes = (
  markdownAST,
  usePrefix = false
) => {
  const nodes = select(markdownAST, "inlineCode");
  var res = [];
  nodes.map(node => {
    if (usePrefix === false) {
      return select(markdownAST, "paragraph link:only-child");
    } else if (usePrefix === true) {
      if (!node.value.startsWith("oembed:")) return;
      node.url = node.value.substring(7).trim();
      res.push(node);
      return res;
    } else {
      usePrefix.map(prefix => {
        if (node.value.startsWith(prefix)) {
          node.url = node.value.split(":");
          node.url.shift();
          node.url = node.url.join(":").trim();
          return res.push(node);
        }
      });
    }
  });
  return res;
};

module.exports = selectPossibleOembedLinkNodes;
