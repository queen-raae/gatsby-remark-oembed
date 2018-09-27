const {
  fetchOembedProviders,
  getProviderEndpointUrlForLinkUrl,
  fetchOembed,
  selectPossibleOembedLinkNodes,
  tranformsLinkNodeToOembedNode,
  filterProviders,
  filterProviderKeys
} = require("./helpers");

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

describe("#getProviderEndpointUrlForLinkUrl", () => {
  test("only urls matching one of the providers schemes return an endpoint url", () => {
    // TODO: Figure out why some providers do not have schemes,
    // and what to do about it.
    expect(() => {
      getProviderEndpointUrlForLinkUrl(
        "https://www.youtube.com/watch?v=b2H7fWhQcdE",
        providers
      );
    }).toThrowError(
      "No endpoint url for https://www.youtube.com/watch?v=b2H7fWhQcdE"
    );
    expect(
      getProviderEndpointUrlForLinkUrl(
        "https://www.instagram.com/p/BftIg_OFPFX/",
        providers
      )
    ).toBe("https://api.instagram.com/oembed");
  });
});

describe("#fetchOembed", () => {
  test("return correctly formated response", () => {
    const response = {
      html: expect.anything()
    };
    return expect(
      fetchOembed(
        "https://www.instagram.com/p/BftIg_OFPFX/",
        "https://api.instagram.com/oembed"
      )
    ).resolves.toMatchObject(response);
  });
});

describe("#selectPossibleOembedLinkNodes", () => {
  test("select only links that are the only child of a paragraph", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(markdownAST);
    expect(possibleOembedLinks).toHaveLength(1);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "link",
      url: "https://www.youtube.com/watch?v=b2H7fWhQcdE"
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

const markdownAST = {
  children: [
    {
      position: {
        end: {
          column: 4,
          line: 4,
          offset: 62
        },
        indent: [1, 1, 1],
        start: {
          column: 1,
          line: 1,
          offset: 0
        }
      },
      type: "yaml",
      value: 'title: New Beginnings\ndate: "2015-05-28T22:40:32.169Z"'
    },
    {
      children: [
        {
          children: [
            {
              position: {
                end: {
                  column: 44,
                  line: 6,
                  offset: 107
                },
                indent: [],
                start: {
                  column: 1,
                  line: 6,
                  offset: 64
                }
              },
              type: "text",
              value: "https://www.youtube.com/watch?v=b2H7fWhQcdE"
            }
          ],
          position: {
            end: {
              column: 44,
              line: 6,
              offset: 107
            },
            indent: [],
            start: {
              column: 1,
              line: 6,
              offset: 64
            }
          },
          title: null,
          type: "link",
          url: "https://www.youtube.com/watch?v=b2H7fWhQcdE"
        }
      ],
      position: {
        end: {
          column: 44,
          line: 6,
          offset: 107
        },
        indent: [],
        start: {
          column: 1,
          line: 6,
          offset: 64
        }
      },
      type: "paragraph"
    },
    {
      children: [
        {
          position: {
            end: {
              column: 29,
              line: 9,
              offset: 213
            },
            indent: [1],
            start: {
              column: 1,
              line: 8,
              offset: 109
            }
          },
          type: "text",
          value:
            "Far far away, behind the word mountains, far from the countries Vokalia and\nConsonantia, there live the "
        },
        {
          children: [
            {
              position: {
                end: {
                  column: 41,
                  line: 9,
                  offset: 225
                },
                indent: [],
                start: {
                  column: 30,
                  line: 9,
                  offset: 214
                }
              },
              type: "text",
              value: "blind texts"
            }
          ],
          position: {
            end: {
              column: 62,
              line: 9,
              offset: 246
            },
            indent: [],
            start: {
              column: 29,
              line: 9,
              offset: 213
            }
          },
          title: null,
          type: "link",
          url: "http://example.com"
        },
        {
          position: {
            end: {
              column: 102,
              line: 9,
              offset: 286
            },
            indent: [],
            start: {
              column: 62,
              line: 9,
              offset: 246
            }
          },
          type: "text",
          value: ". Separated they live in Bookmarksgrove."
        }
      ],
      position: {
        end: {
          column: 102,
          line: 9,
          offset: 286
        },
        indent: [1],
        start: {
          column: 1,
          line: 8,
          offset: 109
        }
      },
      type: "paragraph"
    }
  ],
  position: {
    end: {
      column: 1,
      line: 10,
      offset: 287
    },
    start: {
      column: 1,
      line: 1,
      offset: 0
    }
  },
  type: "root"
};

const providers = [
  {
    provider_name: "Instagram",
    provider_url: "https://instagram.com",
    endpoints: [
      {
        schemes: [
          "http://instagram.com/p/*",
          "http://instagr.am/p/*",
          "http://www.instagram.com/p/*",
          "http://www.instagr.am/p/*",
          "https://instagram.com/p/*",
          "https://instagr.am/p/*",
          "https://www.instagram.com/p/*",
          "https://www.instagr.am/p/*"
        ],
        url: "https://api.instagram.com/oembed",
        formats: ["json"]
      }
    ]
  },
  {
    provider_name: "Kickstarter",
    provider_url: "http://www.kickstarter.com",
    endpoints: [
      {
        schemes: ["http://www.kickstarter.com/projects/*"],
        url: "http://www.kickstarter.com/services/oembed"
      }
    ]
  },
  {
    provider_name: "Twitter",
    provider_url: "http://www.twitter.com/",
    endpoints: [
      {
        schemes: [
          "https://twitter.com/*/status/*",
          "https://*.twitter.com/*/status/*"
        ],
        url: "https://publish.twitter.com/oembed"
      }
    ]
  }
];
