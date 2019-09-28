const axios = require("axios");

const fetchOembed = async (endpoint, proxyAgent) => {
  let proxy = {};
  if (proxyAgent) {
    // has proxy
    if (proxyAgent.useSocks5) {
      proxy = {
        httpAgent: proxyAgent.agent,
        httpsAgent: proxyAgent.agent
      };
    } else {
      proxy = {
        proxy: {
          ...proxyAgent
        }
      };
      // no need of useSocks5 in axios proxy configuration
      delete proxy.proxy.useSocks5;
    }
  }
  const response = await axios.get(endpoint.url, {
    params: {
      format: "json",
      ...endpoint.params
    },
    ...proxy
  });
  return response.data;
};

module.exports = fetchOembed;
