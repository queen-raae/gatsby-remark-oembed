const ammendParams = (params = {}, providerName, providerSettings) => {
  if (!providerSettings[providerName]) return params;

  return {
    ...params,
    ...providerSettings[providerName]
  };
};

module.exports = ammendParams
