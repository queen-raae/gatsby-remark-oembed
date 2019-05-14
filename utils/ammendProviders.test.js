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
    Test1: {
      param1: "param1",
      endpoints: [
        {
          schemes: ["https://test1.no/*"]
        }
      ]
    },
    Test2: {
      param2: "param2",
      endpoints: [
        {
          schemes: ["https://test2.com/*"],
          url: "https://test2.com/oembed"
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

  const ammendedVimeo = ammendedProviders.find(
    provider => provider.provider_name === "Vimeo"
  );

  const ammendedTest1 = ammendedProviders.find(
    provider => provider.provider_name === "Test1"
  );

  const addedTest2 = ammendedProviders.find(
    provider => provider.provider_name === "Test2"
  );

  const untouchedTest3 = ammendedProviders.find(
    provider => provider.provider_name === "Test3"
  );

  test("ammended providers list is expected length", () => {
    expect(ammendedProviders.length).toEqual(6);
  });

  test("ammended Twitter has added params", () => {
    expect(ammendedTwitter.params).toEqual(providerSettings["Twitter"]);
    expect(ammendedTwitter.endpoints[0].schemes[0]).toEqual(
      "https://twitter.com/*/status/*"
    );
  });

  test("ammended Instagram has added params", () => {
    expect(ammendedInstagram.params).toEqual(providerSettings["Instagram"]);
  });

  test("ammended Vimeo has correct format", () => {
    expect(ammendedVimeo.endpoints[0].url).toEqual(
      "https://vimeo.com/api/oembed.json"
    );
  });

  test("ammended Test1 has changed schema and added params", () => {
    expect(ammendedTest1.params).toEqual(providerSettings["Test1"]);
    expect(ammendedTest1.endpoints[0].schemes[0]).toEqual("https://test1.no/*");
    expect(ammendedTest1.endpoints[0].url).toEqual("https://test1.com/oembed");
  });

  test("added Test2 exists and is correct", () => {
    expect(addedTest2.params).toEqual(providerSettings["Test2"]);
    expect(addedTest2.endpoints[0].schemes[0]).toEqual("https://test2.com/*");
    expect(addedTest2.endpoints[0].url).toEqual("https://test2.com/oembed");
  });

  test("Test3 is untouched", () => {
    expect(untouchedTest3.params).toEqual({});
    expect(untouchedTest3.endpoints[0].schemes[0]).toEqual(
      "https://test3.com/*"
    );
    expect(untouchedTest3.endpoints[0].url).toEqual("https://test3.com/oembed");
  });

  test("Empty providers and/or settings is accepted", () => {
    expect(ammendProviders()).toEqual([]);
  });
});
