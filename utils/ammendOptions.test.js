const ammendOptions = require("./ammendOptions");

test("options ammended correctly", () => {
  const rawOptions = {
    usePrefix: true,
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

  const ammendedOptions = {
    usePrefix: true,
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

  expect(ammendOptions(rawOptions)).toEqual(ammendedOptions);
});
