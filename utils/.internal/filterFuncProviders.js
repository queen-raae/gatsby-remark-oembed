const filterFunc = (provider, filter, exclude) => {
  if (!filter) return true

  const filterIncludes = filter.includes(provider.provider_name)
  return exclude === true ? !filterIncludes : filterIncludes
}

module.exports = filterFunc
