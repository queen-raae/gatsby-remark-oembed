const DEFAULT_OPTIONS = {
  usePrefix: false
};

const ammendOptions = options => {
  return { ...DEFAULT_OPTIONS, ...options };
};

module.exports = ammendOptions;
