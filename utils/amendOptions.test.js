const amendOptions = require("./amendOptions");

test("options amended correctly", () => {
  const rawOptions = {
    usePrefix: ["oembed:", "video:"],
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
    usePrefix: ["oembed:", "video:"],
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

  expect(amendOptions(rawOptions)).toEqual(amendedOptions);
});
