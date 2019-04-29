const getProviderEndpointForLinkUrl = (linkUrl, providers, reporter) => {
  let transformedEndpoint = {}

  for (const provider of providers) {
    for (const endpoint of provider.endpoints) {
      for (let schema of endpoint.schemes) {
        try {
          schema = schema.replace("*", ".*")
          const regExp = new RegExp(schema)
          if (regExp.test(linkUrl)) {
            transformedEndpoint.url = endpoint.url
            transformedEndpoint.params = {
              url: linkUrl,
              ...provider.params
            }
          }
        } catch (error) {
          reporter.error(
            "Regex problem with provider",
            provider.provider_name,
            schema,
            error.message
          )
        }
      }
    }
  }

  if (!transformedEndpoint.url) {
    throw new Error(`No endpoint for ${linkUrl}`)
  }

  return transformedEndpoint
}

module.exports = getProviderEndpointForLinkUrl
