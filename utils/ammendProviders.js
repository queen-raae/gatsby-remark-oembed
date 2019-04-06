const ammendEndpoints = require('./.internal/ammendEndpoints');
const ammendEndpointUrl = require('./.internal/ammendEndpointUrl');
const ammendParams = require('./.internal/ammendParams');
const ammendSchemes = require('./.internal/ammendSchemes');

const ammendProviders = (providers = [], providerSettings = {}) => {
  return providers.map(provider => {
    const providerName = provider.provider_name;

    return {
      ...provider,
      endpoints: ammendEndpoints(provider.endpoints, providerName).map(
        endpoint => {
          endpoint.schemes = ammendSchemes(endpoint.schemes, providerName);
          endpoint.url = ammendEndpointUrl(endpoint.url, providerName);
          return endpoint;
        }
      ),
      params: ammendParams(provider.params, providerName, providerSettings)
    };
  });
};

module.exports = ammendProviders
