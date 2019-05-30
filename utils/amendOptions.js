const { defaultsDeep } = require("lodash");

const DEFAULT_OPTIONS = {
  usePrefix: ["oembed:"]
};

const amendOptions = options => {
  return defaultsDeep({}, options, DEFAULT_OPTIONS);
};

module.exports = amendOptions;
