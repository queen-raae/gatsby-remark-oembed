const amendOptions = require("./amendOptions");

describe("#amendProviders", () => {
  test("no change to default options", () => {
    const rawOptions = {};
    const amendedOptions = {
      usePrefix: false,
      unfurl: false
    };

    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("usePrefix = 'true' amended correctly", () => {
    const rawOptions = {
      usePrefix: true
    };

    const amendedOptions = {
      usePrefix: ["oembed"],
      unfurl: false
    };

    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("usePrefix = <array> amended correctly", () => {
    const rawOptions1 = {
      usePrefix: ["oembed", "video"]
    };

    const amendedOptions1 = {
      usePrefix: ["oembed", "video"],
      unfurl: false
    };

    const rawOptions2 = {
      usePrefix: ["video"]
    };

    const amendedOptions2 = {
      usePrefix: ["video"],
      unfurl: false
    };

    expect(amendOptions(rawOptions1)).toEqual(amendedOptions1);
    expect(amendOptions(rawOptions2)).toEqual(amendedOptions2);
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
