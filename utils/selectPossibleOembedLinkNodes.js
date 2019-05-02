const select = require("unist-util-select");

const selectPossibleOembedLinkNodes = (markdownAST, usePrefix = false) => {
  if (usePrefix === true) {
    const nodes = select(markdownAST, "inlineCode");
    var res = [];
    nodes.map(node => {
      if (!node.value.startsWith("oembed:")) return;
      node.url = node.value.substring(7).trim();
      res.push(node);
    });
    return res;
  } else {
    return select(markdownAST, "paragraph link:only-child");
  }
};

module.exports = selectPossibleOembedLinkNodes;
