const ammendProviders = require("./ammendProviders");
const PROVIDERS = require("./.test/providers");

describe("#ammendProviders", () => {
  const providerSettings = {
    Twitter: {
      theme: "dark"
    },
    Instagram: {
      hidecaption: true,
      omitscript: true
    },
    Kickstarter: {
      addHttpsToEndpointsSchemes: true,
      forceHttpsInEndpointUrl: true
    },
    YouTube: {
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
    Replit: {
      provider_name: "Replit",
      endpoints: [
        {
          schemes: ["https://repl.it/@*/*"],
          url: "https://repl.it/data/oembed"
        }
      ]
    }
  };

  const ammendedProviders = ammendProviders(PROVIDERS, providerSettings);

  const ammendedTwitter = ammendedProviders.find(
    provider => provider.provider_name === "Twitter"
  );
  const ammendedInstagram = ammendedProviders.find(
    provider => provider.provider_name === "Instagram"
  );
  const ammendedKickstarter = ammendedProviders.find(
    provider => provider.provider_name === "Kickstarter"
  );
  const ammendedYouTube = ammendedProviders.find(
    provider => provider.provider_name === "YouTube"
  );
  const addedReplit = ammendedProviders.find(
    provider => provider.provider_name === "Replit"
  );

  test("ammended Twitter has added params", () => {
    expect(ammendedTwitter.params).toEqual(providerSettings["Twitter"]);
  });

  test("ammended Instagram has added params", () => {
    expect(ammendedInstagram.params).toEqual(providerSettings["Instagram"]);
  });

  test("ammended Kickstarter has empty params", () => {
    expect(ammendedKickstarter.params).toEqual({});
  });

  test("ammended Kickstarter has added https to schemes", () => {
    expect(ammendedKickstarter.endpoints[0].schemes[0]).toContain("http://");
    expect(ammendedKickstarter.endpoints[0].schemes[1]).toContain("https://");
  });

  test("ammended Kickstarter forced https to endpoint url", () => {
    expect(ammendedKickstarter.endpoints[0].url).toContain("https://");
  });

  test("ammended YouTube has endpoints", () => {
    expect(ammendedYouTube.endpoints.length).toEqual(1);
  });

  test("Replit is added and scheme ammened", () => {
    expect(addedReplit.endpoints[0].schemes[0]).toContain("https://");
  });

  test("Empty providers and/or settings is accepted", () => {
    expect(ammendProviders()).toEqual([]);
  });
});
