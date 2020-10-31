const { defaultsDeep } = require("lodash");

const amendEndpointUrl = (url = "") => {
  return url.replace("{format}", "json");
};

const amendEndpoints = (endpoints = []) => {
  return endpoints.map(endpoint => {
    return {
      ...endpoint,
      url: amendEndpointUrl(endpoint.url)
    };
  });
};

const amendProvider = (provider, settings = {}, providerKey) => {
  const amendedProvider = defaultsDeep({}, settings, provider);

  // Delete params that should not be used as params for the provider
  delete settings.endpoints;
  delete settings.addHttpsToEndpointsSchemes;
  delete settings.forceHttpsInEndpointUrl;

  return {
    ...amendedProvider,
    provider_name: providerKey ? providerKey : provider.provider_name,
    endpoints: amendEndpoints(amendedProvider.endpoints),
    params: settings
  };
};

const amendProviders = (providers = [], settings = {}) => {
  const amendedProviders = providers.map(provider => {
    if (provider.provider_name === "Instagram") {
      if (!settings.Instagram) {
        throw new Error(
          "it seems you tried using `Instagram` provider but didn't pass any settings for it"
        );
      }

      const { access_token } = settings.Instagram;

      if (typeof access_token === "undefined" || access_token === "") {
        throw new Error(
          "it seems that you tried using the `Instagram` provider but didn't pass an access_token to the settings"
        );
      }
    }

    return amendProvider(provider, settings[provider.provider_name]);
  });

  Object.keys(settings).forEach(providerKey => {
    if (!providers.find(provider => providerKey === provider.provider_name)) {
      amendedProviders.push(
        amendProvider({}, settings[providerKey], providerKey)
      );
    }
  });

  return amendedProviders;
};

module.exports = amendProviders;
