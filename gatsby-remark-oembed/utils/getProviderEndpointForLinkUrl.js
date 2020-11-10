const getProviderEndpointForLinkUrl = (linkUrl, providers) => {
  let transformedEndpoint = {};

  for (const provider of providers || []) {
    for (const endpoint of provider.endpoints || []) {
      for (let schema of endpoint.schemes || []) {
        schema = schema.replace("*", ".*");
        const regExp = new RegExp(schema);
        if (regExp.test(linkUrl)) {
          if (provider.provider_name === "Instagram") {
            if (!provider.params || !provider.params.access_token) {
              throw new Error(
                "Instagram require you to configure an access_token. For more information, visit https://developers.facebook.com/docs/instagram/oembed/."
              );
            }
          }

          transformedEndpoint.url = endpoint.url;
          transformedEndpoint.params = {
            url: linkUrl,
            ...provider.params
          };
        }
      }
    }
  }

  return transformedEndpoint;
};

module.exports = getProviderEndpointForLinkUrl;
