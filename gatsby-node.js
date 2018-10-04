const {
  ammendOptions,
  ammendProviders,
  filterProviders,
  fetchOembedProviders
} = require("./helpers");

exports.onPreBootstrap = async ({ cache }, rawOptions) => {
  const options = ammendOptions(rawOptions);
  const rawProviders = await fetchOembedProviders();
  const providers = processProviders(rawProviders, options);
  await cache.set("remark-oembed-providers", providers);
};

const processProviders = (providers, options) => {
  providers = ammendProviders(providers);
  return filterProviders(providers, options.providers);
};
