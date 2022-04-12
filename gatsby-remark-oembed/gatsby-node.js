const { createPluginOptionsSchema } = require("./src/pluginOptions");
const { getProviders } = require("./utils");

exports.pluginOptionsSchema = createPluginOptionsSchema;
exports.onPreBootstrap = getProviders;
