const Joi = require("joi");
const { createPluginOptionsSchema, amendOptions } = require("./pluginOptions");

describe("#pluginOptionsSchema", () => {
  const schema = createPluginOptionsSchema({ Joi: Joi });

  describe("usePrefix", () => {
    test("defaults to false", () => {
      expect(schema.validate({})).toMatchObject({
        value: { usePrefix: false },
      });
    });
    test("allows false", () => {
      expect(schema.validate({ usePrefix: false })).not.toHaveProperty("error");
    });
    test("allows true", () => {
      expect(schema.validate({ usePrefix: true })).not.toHaveProperty("error");
    });
    test("allows array", () => {
      expect(
        schema.validate({ usePrefix: ["oembed", "video"] })
      ).not.toHaveProperty("error");
    });
    test("does not allow string", () => {
      expect(schema.validate({ usePrefix: "test" })).toHaveProperty("error");
    });
  });

  describe("prefixes", () => {
    test("forbids usage", () => {
      expect(
        schema.validate({ usePrefix: false, prefixes: ["test"] })
      ).toHaveProperty("error");
      expect(
        schema.validate({ usePrefix: true, prefixes: ["test"] })
      ).toHaveProperty("error");
    });

    test("adds default value when usePrefix is true", () => {
      expect(schema.validate({ usePrefix: true })).toMatchObject({
        value: { prefixes: ["oembed"] },
      });
    });

    test("does not add default value when usePrefix is false", () => {
      expect(schema.validate({ usePrefix: false })).not.toMatchObject({
        value: { prefixes: ["oembed"] },
      });
    });
  });

  describe("providers.include", () => {
    test("defaults to empty array", () => {
      expect(schema.validate({})).toMatchObject({
        value: { providers: { include: [] } },
      });
    });
    test("allows array of string", () => {
      expect(
        schema.validate({ providers: { include: ["Twitter", "Instagram"] } })
      ).not.toHaveProperty("error");
    });
    test("does not allow array of non-string", () => {
      expect(
        schema.validate({ providers: { include: ["Twitter", 1] } })
      ).toHaveProperty("error");
    });
    test("does not allow string", () => {
      expect(
        schema.validate({ providers: { include: "test" } })
      ).toHaveProperty("error");
    });
  });

  describe("providers.exclude", () => {
    test("defaults to empty array", () => {
      expect(schema.validate({})).toMatchObject({
        value: { providers: { exclude: [] } },
      });
    });
    test("allows array of string", () => {
      expect(
        schema.validate({ providers: { exclude: ["Twitter", "Instagram"] } })
      ).not.toHaveProperty("error");
    });
    test("does not allow array of non-string", () => {
      expect(
        schema.validate({ providers: { exclude: ["Twitter", 1] } })
      ).toHaveProperty("error");
    });
    test("does not allow string", () => {
      expect(
        schema.validate({ providers: { exclude: "test" } })
      ).toHaveProperty("error");
    });
  });

  describe("providers.settings", () => {
    test("defaults to empty object", () => {
      expect(schema.validate({})).toMatchObject({
        value: { providers: { settings: {} } },
      });
    });
    test("allows non-objects", () => {
      expect(
        schema.validate({
          providers: { settings: { Twitter: { theme: "dark" } } },
        })
      ).not.toHaveProperty("error");
    });
    test("does not allow non-objects", () => {
      expect(
        schema.validate({ providers: { settings: "test" } })
      ).toHaveProperty("error");
    });
  });
});

describe("#amendProviders", () => {
  test("defaults correctly", () => {
    const rawOptions = {};
    const amendedOptions = {
      usePrefix: false,
      providers: { include: [], exclude: [], settings: {} },
    };

    expect(amendOptions(rawOptions)).toEqual(amendedOptions);
  });

  test("usePrefix = 'true' amends correctly", () => {
    const rawOptions = {
      usePrefix: true,
    };

    const amendedOptions = {
      usePrefix: ["oembed"],
    };

    expect(amendOptions(rawOptions)).toMatchObject(amendedOptions);
  });

  test("usePrefix = <array> passed untouched", () => {
    const rawOptions1 = {
      usePrefix: ["oembed", "video"],
    };

    const amendedOptions1 = {
      usePrefix: ["oembed", "video"],
    };

    const rawOptions2 = {
      usePrefix: ["video"],
    };

    const amendedOptions2 = {
      usePrefix: ["video"],
    };

    expect(amendOptions(rawOptions1)).toMatchObject(amendedOptions1);
    expect(amendOptions(rawOptions2)).toMatchObject(amendedOptions2);
  });

  test("other options passed untouched", () => {
    const rawOptions = {
      providers: {
        include: ["Instagram"],
        settings: {
          Twitter: {
            theme: "dark", // Use the Twitter dark theme
          },
          Codepen: {
            height: 200,
          },
        },
      },
    };

    expect(amendOptions(rawOptions)).toMatchObject(rawOptions);
  });
});
