const amendOptions = require("./amendOptions");

describe("#amendProviders", () => {
  test("no change to default options", () => {
    const rawOptions = {};
    const amendedOptions = {
      usePrefix: false,
      useProxy: false
    };

    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("usePrefix = 'true' amended correctly", () => {
    const rawOptions = {
      usePrefix: true
    };

    const amendedOptions = {
      usePrefix: ["oembed"],
      useProxy: false
    };

    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("usePrefix = <array> amended correctly", () => {
    const rawOptions1 = {
      usePrefix: ["oembed", "video"]
    };

    const amendedOptions1 = {
      usePrefix: ["oembed", "video"],
      useProxy: false
    };

    const rawOptions2 = {
      usePrefix: ["video"]
    };

    const amendedOptions2 = {
      usePrefix: ["video"],
      useProxy: false
    };

    expect(amendOptions(rawOptions1)).toEqual(amendedOptions1);
    expect(amendOptions(rawOptions2)).toEqual(amendedOptions2);
  });

  test("useProxy = an Object", () => {
    const rawOptions = {
      useProxy: {
        host: "1.1.1.1",
        port: "1111",
        useSocks5: false
      }
    };
    const amendedOptions = {
      usePrefix: false,
      useProxy: {
        host: "1.1.1.1",
        port: "1111",
        useSocks5: false
      }
    };
    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("other options amended correctly", () => {
    const rawOptions = {
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

    const amendedOptions = {
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

    expect(amendOptions(rawOptions)).toMatchObject(amendedOptions);
  });
});
