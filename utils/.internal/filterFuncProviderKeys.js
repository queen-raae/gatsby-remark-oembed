const filterFunc = (key, filter, exclude) => {
  if (!filter) return true

  const filterIncludes = filter.includes(key)
  return exclude ? !filterIncludes : filterIncludes
}

module.exports = filterFunc
