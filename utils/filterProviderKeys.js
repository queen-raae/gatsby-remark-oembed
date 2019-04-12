const filterFunc = require('./.internal/filterFuncProviderKeys')

const filterProviderKeys = (keys, filter) => {
  if (!filter) return keys

  return keys
    .filter(key => filterFunc(key, filter.include))
    .filter(key => filterFunc(key, filter.exclude, true))
};

module.exports = filterProviderKeys
