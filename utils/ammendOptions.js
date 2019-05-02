const { defaultsDeep } = require("lodash");

const DEFAULT_OPTIONS = {
  providers: {
    include: undefined,
    exclude: undefined,
    settings: []
  },
  usePrefix: false
};

const ammendOptions = options => defaultsDeep({}, options, DEFAULT_OPTIONS);

module.exports = ammendOptions;
