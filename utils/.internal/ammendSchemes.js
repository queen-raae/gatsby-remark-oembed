const ADD_HTTPS_TO_SCHEMES = [
  "amCharts Live Editor",
  "YouTube",
  "Flickr",
  "MixCloud"
]

const ammendSchemes = (schemes = [], providerName) => {
  if (ADD_HTTPS_TO_SCHEMES.includes(providerName)) {
    const httpsSchemes = [...schemes].map(scheme =>
      scheme.replace("http", "https")
    )
    schemes = schemes.concat(httpsSchemes)
  }
  return schemes
}

module.exports = ammendSchemes
