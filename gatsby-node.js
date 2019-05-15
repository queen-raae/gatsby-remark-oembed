const {
  amendOptions,
  amendProviders,
  filterProviders,
  fetchOembedProviders
} = require("./utils");

exports.onPreBootstrap = async ({ cache, reporter }, rawOptions) => {
  try {
    const options = amendOptions(rawOptions);
    const rawProviders = await fetchOembedProviders();
    const providers = processProviders(rawProviders, options.providers);
    return await cache.set("remark-oembed-providers", providers);
  } catch (error) {
    reporter.error(
      "gatsby-remark-oembed: Failed to fetch list of providers and/or save it to cache",
      error
    );
  }
};

const processProviders = (providers, providerOptions = {}) => {
  providers = amendProviders(providers, providerOptions.settings);
  return filterProviders(providers, providerOptions);
};
