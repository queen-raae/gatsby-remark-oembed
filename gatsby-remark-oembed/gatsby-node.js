const createPluginOptionsSchema = require("./src/createPluginOptionsSchema");
const { getProviders } = require("./utils");

exports.pluginOptionsSchema = createPluginOptionsSchema;
exports.onPreBootstrap = getProviders;
