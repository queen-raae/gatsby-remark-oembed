const amendProviders = require("./amendProviders");
const filterProviders = require("./filterProviders");

module.exports = async ({ reporter }, pluginOptions) => {
  try {
    const rawProviders = require("./../prefetched-providers.json");
    const providers = processProviders(rawProviders, pluginOptions.providers);
    return providers;
  } catch (error) {
    reporter.error(`gatsby-remark-oembed: Failed to get providers`);
    return [];
  }
};

const processProviders = (providers, providerOptions = {}) => {
  providers = amendProviders(providers, providerOptions.settings);
  return filterProviders(providers, providerOptions);
};
