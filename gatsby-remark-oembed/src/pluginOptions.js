const Joi = require("joi");

const DEFAULT_PREFIXES = ["oembed"];
const DEFAULT_PROVIDERS = { include: [], exclude: [], settings: {} };

const createPluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    usePrefix: Joi.alternatives(
      Joi.boolean(),
      Joi.array().items(Joi.string())
    ).default(false),
    prefixes: Joi.forbidden().when("usePrefix", {
      is: true,
      then: Joi.array().items(Joi.string()).default(DEFAULT_PREFIXES),
    }),
    providers: Joi.object({
      include: Joi.array().items(Joi.string()),
      exclude: Joi.array().items(Joi.string()),
      settings: Joi.object(),
    }).default(DEFAULT_PROVIDERS),
  });
};

const amendOptions = (pluginOptions) => {
  // Older versions of Gatsby does not run gatsby-node.js -> pluginOptionsSchema,
  // therefore we must make sure to do so before using the pluginOptions
  const schema = createPluginOptionsSchema({ Joi: Joi });
  const { value, error } = schema.validate(pluginOptions);
  if (error) {
    throw error;
  } else {
    return {
      ...value,
      usePrefix: value.prefixes || value.usePrefix,
    };
  }
};

exports.createPluginOptionsSchema = createPluginOptionsSchema;
exports.amendOptions = amendOptions;
