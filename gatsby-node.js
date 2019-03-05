const {
  ammendOptions,
  ammendProviders,
  filterProviders,
  fetchOembedProviders
} = require("./helpers");

exports.onPreBootstrap = async ({ cache }, rawOptions) => {
  const options = ammendOptions(rawOptions);
  const rawProviders = await fetchOembedProviders();
  const providers = processProviders(rawProviders, options, rawOptions);
  await cache.set("remark-oembed-providers", providers);
};

const processProviders = (providers, optionsAsStrings, rawOptions) => {
  providers = ammendProviders(providers, rawOptions);
  return filterProviders(providers, optionsAsStrings.providers);
};
