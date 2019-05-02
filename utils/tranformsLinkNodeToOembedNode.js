const tranformsLinkNodeToOembedNode = (node, oembedResult) => {
  if (oembedResult.html) {
    node.type = "html";
    node.value = oembedResult.html;
    delete node.children;
  } else if (oembedResult.type === "photo") {
    node.type = "html";
    node.value = `
      <img src="${oembedResult.url}"
        class="gatsby-remark-oembed-photo"
        width="${oembedResult.width}"
        height="${oembedResult.width}"
        title="${oembedResult.title}"/>
    `;
    delete node.children;
  }

  return node;
};

module.exports = tranformsLinkNodeToOembedNode;
