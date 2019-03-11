const select = require("unist-util-select");
const axios = require("axios");

const OEMBED_PROVIDERS_URL = "https://oembed.com/providers.json";
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

const DEFAULT_OPTIONS = {
  providers: {
    include: undefined,
    exclude: undefined
  }
};

exports.ammendOptions = options => {
  const formatFunc = (list) => {
    let result = undefined

    if (list && list.length >= 1) {
      result = []
      list.forEach((item) => {
        if (typeof item === 'object' && item.name) {
          result.push(item.name)
        } else if (typeof item === 'string') {
          result.push(item)
        }
      })
    }

    return result
  }
  
  let opt = {
    include: formatFunc(options.providers.include),
    exclude: formatFunc(options.providers.exclude)
  }

  return {
    providers: { ...DEFAULT_OPTIONS.providers, ...opt }
  };
};

exports.fetchOembedProviders = async () => {
  const response = await axios.get(OEMBED_PROVIDERS_URL);
  return response.data;
};

exports.ammendProviders = (providers, rawOptions) => {
  let includedProvidersWithConfig = {}

  if (rawOptions.providers && rawOptions.providers.include && rawOptions.providers.include.length >= 1) {
    rawOptions.providers.include.forEach(config => {
      if (typeof config === 'object' && config.name) {
        let { name, ...urlParams } = config
        includedProvidersWithConfig[name] = urlParams
      }
    })
  }
    
  const ammendEndpoints = (endpoints = [], providerName) => {
    if (ENDPOINTS[providerName]) {
      endpoints = endpoints.concat(ENDPOINTS[providerName]);
    }
    return endpoints;
  };
    
  const ammendParamsFromOptions = (providerName) => {
    if (includedProvidersWithConfig[providerName]) {
      optionConfig = includedProvidersWithConfig[providerName]
      return optionConfig
    }
    
    return {}
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
    
  return providers.map(provider => {
    const providerName = provider.provider_name;
    provider.endpoints = ammendEndpoints(provider.endpoints, providerName).map(
      endpoint => {
        endpoint.params = ammendParamsFromOptions(providerName);
        endpoint.schemes = ammendSchemes(endpoint.schemes, providerName);
        endpoint.url = ammendEndpointUrl(endpoint.url, providerName);
        return endpoint;
      }
    );
    return provider;
  });
};

exports.filterProviders = (providers, listConfig) => {
  if (!listConfig) return providers;
  
  const filterFunc = (provider, filter, exclude) => {
    if (!filter) return true;

    const filterIncludes = filter.includes(provider.provider_name);
    return exclude === true ? !filterIncludes : filterIncludes;
  };
  
  return providers
    .filter(provider => filterFunc(provider, listConfig.include))
    .filter(provider => filterFunc(provider, listConfig.exclude, true));
};

exports.filterProviderKeys = (keys, filter) => {
  if (!filter) return keys;

  const filterFunc = (key, filter, exclude) => {
    if (!filter) return true;

    const filterIncludes = filter.includes(key);
    return exclude ? !filterIncludes : filterIncludes;
  };

  return keys
    .filter(key => filterFunc(key, filter.include))
    .filter(key => filterFunc(key, filter.exclude, true));
};

exports.getProviderEndpointUrlForLinkUrl = (linkUrl, providers) => {
  let endpointObj = false;

  for (const provider of providers) {
    for (const endpoint of provider.endpoints) {
      for (let schema of endpoint.schemes) {
        try {
          schema = schema.replace("*", ".*");
          const regExp = new RegExp(schema);
          if (regExp.test(linkUrl)) {
            endpointObj = {
              params: endpoint.params || {},
              url: endpoint.url
            }
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

  if (!endpointObj || !endpointObj.url) {
    throw new Error(`No endpoint url for ${linkUrl}`);
  }

  return endpointObj;
};

exports.fetchOembed = async (linkUrl, endpointObj) => {
  console.log('fetch', linkUrl)
  console.log('🤐 endpointObj', endpointObj)

  const response = await axios.get(endpointObj.url, {
    params: {
      url: linkUrl,
      format: "json",
      ...endpointObj.params
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

  return node;
};
