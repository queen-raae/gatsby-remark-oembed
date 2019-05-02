const ADD_HTTPS_TO_ENDPOINT_URL = ["amCharts Live Editor"];

const ammendEndpointUrl = (endpointUrl = "", providerName) => {
  endpointUrl = endpointUrl.replace("{format}", "json");
  if (ADD_HTTPS_TO_ENDPOINT_URL.includes(providerName)) {
    endpointUrl = endpointUrl.replace("http", "https");
  }
  return endpointUrl;
};

module.exports = ammendEndpointUrl;
