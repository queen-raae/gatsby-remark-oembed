const filterFunc = require("./.internal/filterFuncProviders");

const filterProviders = (providers, listConfig) => {
  if (!listConfig) return providers;

  return providers
    .filter(provider => filterFunc(provider, listConfig.include))
    .filter(provider => filterFunc(provider, listConfig.exclude, true));
};

module.exports = filterProviders;
