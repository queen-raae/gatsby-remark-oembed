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

const ammendEndpoints = (endpoints = [], providerName) => {
  if (ENDPOINTS[providerName]) {
    endpoints = endpoints.concat(ENDPOINTS[providerName]);
  }
  return endpoints;
};

module.exports = ammendEndpoints
