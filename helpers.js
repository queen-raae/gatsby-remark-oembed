const select = require("unist-util-select");
const axios = require("axios");

const OEMBED_PROVIDERS_URL = "https://oembed.com/providers.json";

exports.fetchOembedProviders = () => {
  return axios.get(OEMBED_PROVIDERS_URL).then(response => response.data);
};

exports.getProviderEndpointUrlForLinkUrl = (linkUrl, providers) => {
  let endpointUrl = false;

  providers.forEach(provider => {
    const endpoints = provider.endpoints || [];
    endpoints.forEach(endpoint => {
      const schemes = endpoint.schemes || [];
      schemes.forEach(schema => {
        try {
          const regExp = new RegExp(schema);
          if (regExp.test(linkUrl)) {
            endpointUrl = endpoint.url;
          }
        } catch (error) {
          console.log(
            "Regex problem with provider",
            provider.provider_name,
            schema,
            error.message
          );
        }
      });
    });
  });

  return endpointUrl;
};

exports.fetchOembed = (linkUrl, endpointUrl) => {
  return axios
    .get(endpointUrl, {
      params: {
        format: "json",
        url: linkUrl
      }
    })
    .then(response => response.data);
};

exports.selectPossibleOembedLinks = markdownAST => {
  return select(markdownAST, "paragraph link:only-child");
};

exports.tranformsLinkNodeToOembedNode = (node, oembedResult) => {
  node.type = "html";
  node.value = oembedResult.html;
  return node;
};
