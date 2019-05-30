const select = require("unist-util-select");

const selectPossibleOembedLinkNodes = (markdownAST, usePrefix = ['oembed:']) => {
  const nodes = select(markdownAST, "inlineCode");
  var res = [];
  nodes.map(node => {
    usePrefix.map(prefix => {
      if (node.value.startsWith(prefix)) {
        node.url = node.value.split(':');
        node.url.shift();
        node.url = node.url.join(':').trim();
        return res.push(node);
      }
    });
  });
  return res;
};

module.exports = selectPossibleOembedLinkNodes;
