const select = require("unist-util-select");
const axios = require("axios");

const OEMBED_PROVIDERS_URL = "https://oembed.com/providers.json";

exports.fetchOembedProviders = async () => {
  const response = await axios.get(OEMBED_PROVIDERS_URL);
  return response.data;
};

exports.getProviderEndpointUrlForLinkUrl = (linkUrl, providers) => {
  let endpointUrl = false;

  providers.forEach(provider => {
    provider.endpoints.forEach(endpoint => {
      endpoint.schemes.forEach(schema => {
        const regExp = new RegExp(schema);
        if (regExp.test(linkUrl)) {
          endpointUrl = endpoint.url;
        }
      });
    });
  });

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

exports.selectPossibleOembedLinks = markdownAST => {
  return select(markdownAST, "paragraph link:only-child");
};

exports.tranformsLinkNodeToOembedNode = (node, oembedResult) => {
  node.type = "html";
  node.value = oembedResult.html;
  return node;
};
