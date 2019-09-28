const { defaultsDeep } = require("lodash");
const SocksProxyAgent = require("socks-proxy-agent");

const DEFAULT_PROXY = {
  host: "127.0.0.1",
  port: "1080",
  useSocks5: true
};

const getProxyAgent = useProxy => {
  if (!useProxy) {
    return false;
  }
  let proxyAgent = defaultsDeep({}, useProxy, DEFAULT_PROXY);
  if (proxyAgent.useSocks5) {
    const socks5Proxy = `socks://${proxyAgent.host}:${proxyAgent.port}`;
    proxyAgent.agent = new SocksProxyAgent(socks5Proxy);
  }
  return proxyAgent;
};

module.exports = getProxyAgent;
