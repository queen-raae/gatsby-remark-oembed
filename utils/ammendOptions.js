const { defaultsDeep } = require("lodash");

const DEFAULT_OPTIONS = {
  providers: {
    include: undefined,
    exclude: undefined,
    settings: {
      "amCharts Live Editor": {
        forceHttpsInEndpointUrl: true,
        addHttpsToEndpointsSchemes: true
      },
      Flickr: {
        addHttpsToEndpointsSchemes: true
      },
      YouTube: {
        addHttpsToEndpointsSchemes: true,
        endpoints: [
          {
            schemes: [
              "http://*.youtube.com/watch*",
              "http://*.youtube.com/v/*",
              "http://youtu.be/*"
            ],
            url: "https://www.youtube.com/oembed"
          }
        ]
      },
      MixCloud: {
        addHttpsToEndpointsSchemes: true
      },
      Nasjonalbiblioteket: {
        endpoints: [
          {
            schemes: ["https://www.nb.no/items/*"],
            url: "https://api.nb.no/catalog/v1/oembed"
          }
        ]
      }
    }
  },
  usePrefix: false
};

const ammendOptions = options => defaultsDeep({}, options, DEFAULT_OPTIONS);

module.exports = ammendOptions;
