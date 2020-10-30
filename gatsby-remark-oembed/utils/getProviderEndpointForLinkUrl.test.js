const getProviderEndpointForLinkUrl = require("./getProviderEndpointForLinkUrl");
const PROVIDERS = require("./.test/providers");

describe("#getProviderEndpointForLinkUrl", () => {
  test("only urls matching one of the providers schemes return a valid endpoint", () => {
    expect(
      getProviderEndpointForLinkUrl(
        "https://www.youtube.com/watch?v=b2H7fWhQcdE",
        PROVIDERS
      )
    ).toEqual({});
    expect(
      getProviderEndpointForLinkUrl(
        "https://www.instagram.com/p/BftIg_OFPFX/",
        PROVIDERS
      )
    ).toEqual({
      url: "https://api.instagram.com/oembed",
      params: { url: "https://www.instagram.com/p/BftIg_OFPFX/" }
    });

    expect(
      getProviderEndpointForLinkUrl(
        "https://www.instagram.com/p/BftIg_OFPFX/",
        []
      )
    ).toEqual({});
  });

  test("Empty providers and/or link: is accepted", () => {
    expect(getProviderEndpointForLinkUrl()).toEqual({});
  });
});
