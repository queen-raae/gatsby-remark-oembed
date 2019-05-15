const { defaultsDeep } = require("lodash");

const ammendEndpointUrl = (url = "") => {
  return url.replace("{format}", "json");
};

const ammendEndpoints = (endpoints = []) => {
  return endpoints.map(endpoint => {
    return {
      ...endpoint,
      url: ammendEndpointUrl(endpoint.url)
    };
  });
};

const ammendProvider = (provider, settings = {}, providerKey) => {
  const ammendedProvider = defaultsDeep({}, settings, provider);

  // Delete params that should not be used as params for the provider
  delete settings.endpoints;
  delete settings.addHttpsToEndpointsSchemes;
  delete settings.forceHttpsInEndpointUrl;

  return {
    ...ammendedProvider,
    provider_name: providerKey ? providerKey : provider.provider_name,
    endpoints: ammendEndpoints(ammendedProvider.endpoints),
    params: settings
  };
};

const ammendProviders = (providers = [], settings = {}) => {
  const ammendedProviders = providers.map(provider => {
    return ammendProvider(provider, settings[provider.provider_name]);
  });

  Object.keys(settings).forEach(providerKey => {
    if (!providers.find(provider => providerKey === provider.provider_name)) {
      ammendedProviders.push(
        ammendProvider({}, settings[providerKey], providerKey)
      );
    }
  });

  return ammendedProviders;
};

module.exports = ammendProviders;
