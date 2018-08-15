const select = require("unist-util-select");
const axios = require("axios");

const OEMBED_PROVIDERS_URL = "https://oembed.com/providers.json";

exports.fetchOembedProviders = async () => {
  const response = await axios.get(OEMBED_PROVIDERS_URL);
  return response.data;
};

exports.getProviderEndpointUrlForLinkUrl = (linkUrl, providers) => {
  let endpointUrl = false;

  for (const provider of providers) {
    for (const endpoint of provider.endpoints || []) {
      for (let schema of endpoint.schemes || []) {
        try {
          schema = schema.replace("*", ".*");
          const regExp = new RegExp(schema);
          if (regExp.test(linkUrl)) {
            endpointUrl = endpoint.url.replace("{format}", "json");
          }
        } catch (error) {
          console.log(
            "Regex problem with provider",
            provider.provider_name,
            schema,
            error.message
          );
        }
      }
    }
  }

  if (!endpointUrl) {
    console.log("No endpoint url for", linkUrl);
  }

  return endpointUrl;
};

exports.fetchOembed = async (linkUrl, endpointUrl) => {
  const response = await axios.get(endpointUrl, {
    params: {
      format: "json",
      url: linkUrl
    }
  });
  return response.data;
};

exports.selectPossibleOembedLinkNodes = markdownAST => {
  return select(markdownAST, "paragraph link:only-child");
};

exports.tranformsLinkNodeToOembedNode = (node, oembedResult) => {
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
};
