const { defaultsDeep } = require("lodash");

const DEFAULT_OPTIONS = {
  usePrefix: false
};

const amendOptions = options => {
  return defaultsDeep({}, options, DEFAULT_OPTIONS);
};

module.exports = amendOptions;
