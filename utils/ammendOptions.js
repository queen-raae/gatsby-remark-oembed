const { defaultsDeep } = require("lodash");

const DEFAULT_OPTIONS = {
  usePrefix: false
};

const ammendOptions = options => {
  return defaultsDeep({}, options, DEFAULT_OPTIONS);
};

module.exports = ammendOptions;
