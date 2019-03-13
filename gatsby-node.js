const {
  ammendOptions,
  ammendProviders,
  filterProviders,
  fetchOembedProviders
} = require("./helpers");

exports.onPreBootstrap = async ({ cache }, rawOptions) => {
  const options = ammendOptions(rawOptions);
  const rawProviders = await fetchOembedProviders();
  const providers = processProviders(rawProviders, options.providers);
  await cache.set("remark-oembed-providers", providers);
};

const processProviders = (providers, providerOptions = {}) => {
  providers = ammendProviders(providers, providerOptions.settings);
  return filterProviders(providers, providerOptions);
};
