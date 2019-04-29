const DEFAULT_OPTIONS = {
  providers: {
    include: undefined,
    exclude: undefined,
    settings: []
  }
};

const ammendOptions = options => ({
  providers: {...DEFAULT_OPTIONS.providers, ...options.providers}
})

module.exports = ammendOptions
