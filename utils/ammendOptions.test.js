const ammendOptions = require("./ammendOptions");

test("options ammended correctly", () => {
  const rawOptions = {
    usePrefix: true,
    providers: {
      include: ["Instagram"],
      settings: {
        Twitter: {
          theme: "dark" // Use the Twitter dark theme
        },
        Codepen: {
          height: 200
        }
      }
    }
  };

  const ammendedOptions = {
    usePrefix: true,
    providers: {
      include: ["Instagram"],
      exclude: undefined,
      settings: {
        "amCharts Live Editor": {
          forceHttpsInEndpointUrl: true,
          addHttpsToEndpointsSchemes: true
        },
        Flickr: {
          addHttpsToEndpointsSchemes: true
        },
        Twitter: {
          theme: "dark" // Use the Twitter dark theme
        },
        Codepen: {
          height: 200
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
    }
  };

  expect(ammendOptions(rawOptions)).toEqual(ammendedOptions);
});
