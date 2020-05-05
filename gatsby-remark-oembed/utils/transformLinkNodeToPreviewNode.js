const transformLinkNodeToPreviewNode = (node, metaData) => {
  node.type = "html";
  node.value = `
      <a href="${metaData.open_graph.url}">
        <img src="${metaData.open_graph.images[0].url}"
          class="gatsby-remark-oembed-preview-photo"
          width="100%"
          title="${metaData.open_graph.title}"/>
        <div>${metaData.open_graph.title}</div>
        <div>${metaData.open_graph.description}</div>
      </a>
    `;
  delete node.children;

  return node;
};

module.exports = transformLinkNodeToPreviewNode;
