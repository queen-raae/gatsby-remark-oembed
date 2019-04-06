const ENDPOINTS = {
  YouTube: {
    schemes: [
      "http://*.youtube.com/watch*",
      "http://*.youtube.com/v/*",
      "http://youtu.be/*"
    ],
    url: "https://www.youtube.com/oembed"
  },
  Nasjonalbiblioteket: {
    schemes: ["https://www.nb.no/items/*"],
    url: "https://api.nb.no/catalog/v1/oembed"
  }
};

const ADD_HTTPS_TO_SCHEMES = [
  "amCharts Live Editor",
  "YouTube",
  "Flickr",
  "MixCloud"
];

const ADD_HTTPS_TO_ENDPOINT_URL = ["amCharts Live Editor"];

const ammendProviders = (providers = [], providerSettings = {}) => {
  const ammendEndpoints = (endpoints = [], providerName) => {
    if (ENDPOINTS[providerName]) {
      endpoints = endpoints.concat(ENDPOINTS[providerName]);
    }
    return endpoints;
  };

  const ammendSchemes = (schemes = [], providerName) => {
    if (ADD_HTTPS_TO_SCHEMES.includes(providerName)) {
      const httpsSchemes = [...schemes].map(scheme =>
        scheme.replace("http", "https")
      );
      schemes = schemes.concat(httpsSchemes);
    }
    return schemes;
  };

  const ammendEndpointUrl = (endpointUrl = "", providerName) => {
    endpointUrl = endpointUrl.replace("{format}", "json");
    if (ADD_HTTPS_TO_ENDPOINT_URL.includes(providerName)) {
      endpointUrl = endpointUrl.replace("http", "https");
    }
    return endpointUrl;
  };

  const ammendParams = (params = {}, providerName) => {
    if (!providerSettings[providerName]) return params;

    return {
      ...params,
      ...providerSettings[providerName]
    };
  };

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
      params: ammendParams(provider.params, providerName)
    };
  });
};

module.exports = ammendProviders
