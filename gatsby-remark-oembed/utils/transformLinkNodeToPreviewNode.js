const transformLinkNodeToPreviewNode = (node, metaData) => {
  node.type = "html";
  node.value = `
      <div class="gatsby-remark-oembed-preview-wrapper">
        <a href="${metaData.open_graph.url}" class="gatsby-remark-oembed-preview-link">
          <img src="${metaData.open_graph.images[0].url}"
            class="gatsby-remark-oembed-preview-image"
            width="100%"
            title="${metaData.open_graph.title}"
          />
          <h3 class="gatsby-remark-oembed-preview-title">${metaData.open_graph.title}</h3>
          <p class="gatsby-remark-oembed-preview-description">${metaData.open_graph.description}</p>
        </a>
      </div>
    `;
  delete node.children;

  return node;
};

module.exports = transformLinkNodeToPreviewNode;
