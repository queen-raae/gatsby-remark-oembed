var url = require("url");

const transformLinkNodeToPreviewNode = (node, metaData) => {
  const linkUrl = metaData.open_graph.url || node.url;
  const host = url.parse(linkUrl).host;

  node.type = "html";
  node.value = `
      <div class="gatsby-remark-oembed-preview-wrapper">
        <a href="${linkUrl}" class="gatsby-remark-oembed-preview-link">
          <img src="${metaData.open_graph.images[0].url}"
            class="gatsby-remark-oembed-preview-image"
            width="100%"
            title="${metaData.open_graph.title}"
          />
          <p class="gatsby-remark-oembed-preview-host">${host}</p>
          <h3 class="gatsby-remark-oembed-preview-title">${
            metaData.open_graph.title || ""
          }</h3>
          <p class="gatsby-remark-oembed-preview-description">${
            metaData.open_graph.description || ""
          }</p>
        </a>
      </div>
    `;
  delete node.children;

  return node;
};

module.exports = transformLinkNodeToPreviewNode;
