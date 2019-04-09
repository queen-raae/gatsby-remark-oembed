const _ = require("lodash");

const {
  fetchOembedProviders,
  getProviderEndpointForLinkUrl,
  fetchOembed,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  filterProviders,
  filterProviderKeys,
  ammendProviders
} = require("./helpers");

const { MARKDOWN_AST, PROVIDERS } = require("./helper.test.data");

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

describe("#filterProviders", () => {
  const kickstarter = {
    provider_name: "Kickstarter"
  };
  const twitter = {
    provider_name: "Twitter"
  };

  const instagram = {
    provider_name: "Instagram"
  };

  const providers = [kickstarter, twitter, instagram];

  test("do nothing to the list of providers", () => {
    expect(filterProviders(providers, undefined)).toEqual(providers);
    expect(filterProviders(providers, {})).toEqual(providers);
  });

  test("returns a list of providers with only Instagram", () => {
    const filteredProviders = filterProviders(providers, {
      include: ["Instagram", "Twitter"],
      exclude: ["Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining([expect.objectContaining(instagram)]),
      expect.not.arrayContaining([kickstarter, twitter])
    );
  });

  test("returns a list of providers with only Instagram and Twitter", () => {
    const filteredProviders = filterProviders(providers, {
      include: ["Instagram", "Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining([instagram, twitter]),
      expect.not.arrayContaining([kickstarter])
    );
  });

  test("returns a list of providers without Instagram and Twitter, ie. only Kickstarter", () => {
    const filteredProviders = filterProviders(providers, {
      exclude: ["Instagram", "Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining([kickstarter]),
      expect.not.arrayContaining([instagram, twitter])
    );
  });
});

describe("#filterProviderKeys", () => {
  const providers = ["Kickstarter", "Twitter", "Instagram"];

  test("do nothing to the list of providers", () => {
    expect(filterProviderKeys(providers, undefined)).toEqual(providers);
    expect(filterProviderKeys(providers, {})).toEqual(providers);
  });

  test("returns a list of providers with only Instagram", () => {
    const filteredProviders = filterProviderKeys(providers, {
      include: ["Instagram", "Twitter"],
      exclude: ["Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining(["Instagram"]),
      expect.not.arrayContaining(["Kickstarter", "Twitter"])
    );
  });

  test("returns a list of providers with only Instagram and Twitter", () => {
    const filteredProviders = filterProviderKeys(providers, {
      include: ["Instagram", "Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining(["Instagram", "Twitter"]),
      expect.not.arrayContaining(["Kickstarter"])
    );
  });

  test("returns a list of providers without Instagram and Twitter, ie. only Kickstarter", () => {
    const filteredProviders = filterProviderKeys(providers, {
      exclude: ["Instagram", "Twitter"]
    });

    expect(filteredProviders).toEqual(
      expect.arrayContaining(["Kickstarter"]),
      expect.not.arrayContaining(["Instagram", "Twitter"])
    );
  });
});

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

describe("#getProviderEndpointForLinkUrl", () => {
  test("only urls matching one of the providers schemes return an endpoint", () => {
    expect(() => {
      getProviderEndpointForLinkUrl(
        "https://www.youtube.com/watch?v=b2H7fWhQcdE",
        PROVIDERS
      );
    }).toThrowError(
      "No endpoint for https://www.youtube.com/watch?v=b2H7fWhQcdE"
    );
    expect(
      getProviderEndpointForLinkUrl(
        "https://www.instagram.com/p/BftIg_OFPFX/",
        PROVIDERS
      )
    ).toEqual({
      url: "https://api.instagram.com/oembed",
      params: { url: "https://www.instagram.com/p/BftIg_OFPFX/" }
    });
  });
});

describe("#fetchOembed", () => {
  test("return correctly formated response", () => {
    const response = {
      html: expect.anything()
    };
    return expect(
      fetchOembed({
        url: "https://api.instagram.com/oembed",
        params: {
          url: "https://www.instagram.com/p/BftIg_OFPFX/"
        }
      })
    ).resolves.toMatchObject(response);
  });
});

describe("#selectPossibleOembedLinkNodes", () => {
  test("select only links that are the only child of a paragraph", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST);
    expect(possibleOembedLinks).toHaveLength(1);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "link",
      url: "https://www.instagram.com/p/Bof9WhgBmY2"
    });
  });

  test("select only links that inline code and prefixed with 'oembed:'", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(
      MARKDOWN_AST,
      true
    );
    expect(possibleOembedLinks).toHaveLength(2);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "inlineCode",
      url: "https://twitter.com/raae/status/1045394833001652225"
    });
    // allow space after 'omembed:'
    expect(possibleOembedLinks[1]).toMatchObject({
      type: "inlineCode",
      url: "https://www.instagram.com/p/Bof9WhgBmY2"
    });
  });
});

describe("#tranformsLinkNodeToOembedNode", () => {
  const originalNode = {
    type: "link"
  };

  const transformedNode = tranformsLinkNodeToOembedNode(originalNode, {
    author_name: "LevelUpTuts",
    author_url: "https://www.youtube.com/user/LevelUpTuts",
    height: 270,
    html:
      '<iframe width="480" height="270" src="https://www.youtube.com/embed/b2H7fWhQcdE?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
    provider_name: "YouTube",
    provider_url: "https://www.youtube.com/",
    thumbnail_height: 360,
    thumbnail_url: "https://i.ytimg.com/vi/b2H7fWhQcdE/hqdefault.jpg",
    thumbnail_width: 480,
    title: "GatsbyJS Tutorials #1 - Getting Started with Gatsby",
    type: "video",
    version: "1.0",
    width: 480
  });

  test("change node type to html", () => {
    expect(transformedNode.type).toBe("html");
  });

  test("set value to omebed result html", () => {
    expect(transformedNode.value).toBe(
      '<iframe width="480" height="270" src="https://www.youtube.com/embed/b2H7fWhQcdE?feature=oembed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>'
    );
  });
});
