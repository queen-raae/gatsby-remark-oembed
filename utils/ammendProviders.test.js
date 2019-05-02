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

  test("ammended Twitter has added params", () => {
    expect(ammendedTwitter.params).toEqual(providerSettings["Twitter"]);
  });

  test("ammended Instagram has added params", () => {
    expect(ammendedInstagram.params).toEqual(providerSettings["Instagram"]);
  });

  test("ammended Kickstarter has empty params", () => {
    expect(ammendedKickstarter.params).toEqual({});
  });
});
