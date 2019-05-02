const fetchOembedProviders = require("./fetchOembedProviders");

describe("#fetchOembedProviders", () => {
  test("returns a list of providers", () => {
    const endpoint = {
      schemes: expect.arrayContaining([expect.anything()]),
      url: expect.anything()
    };
    const provider = {
      provider_name: expect.anything(),
      provider_url: expect.anything(),
      endpoints: expect.arrayContaining([endpoint])
    };
    return expect(fetchOembedProviders()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining(provider)])
    );
  });
});
