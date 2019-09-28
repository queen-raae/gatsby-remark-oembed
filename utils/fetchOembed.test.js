const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const SocksProxyAgent = require("socks-proxy-agent");
const fetchOembed = require("./fetchOembed");

const mock = new MockAdapter(axios);

describe("#fetchOembed", () => {
  const response = { html: "HTML" };
  const endpoint = {
    url: "https://api.instagram.com/oembed",
    params: {
      url: "https://www.instagram.com/p/BftIg_OFPFX/"
    }
  };

  afterEach(() => {
    mock.reset();
  });

  test("succeeded fetch return unaltered response.data", done => {
    mock.onGet(endpoint.url).reply(200, response);

    fetchOembed(endpoint).then(result => {
      expect(result).toMatchObject(response);
      done();
    });
  });

  test("failed fetch returns unaltered error", done => {
    mock.onGet(endpoint.url).networkError();

    fetchOembed(endpoint).catch(result => {
      expect(result).toMatchObject(new Error("Network Error"));
      done();
    });
  });

  test("calls axios get function with correct params", done => {
    mock.onGet(endpoint.url).reply(200, response);

    fetchOembed(endpoint).then(() => {
      expect(mock.history.get[0].params).toEqual({
        url: "https://www.instagram.com/p/BftIg_OFPFX/",
        format: "json"
      });
      done();
    });
  });

  test("call axios with socks5 proxy", done => {
    const socks5 = `socks5://127.0.0.1:9527`;
    const socks5Proxy = new SocksProxyAgent(socks5);
    const proxyAgent = {
      useSocks5: true,
      agent: socks5Proxy
    };

    mock.onGet(endpoint.url).reply(200, response);
    fetchOembed(endpoint, proxyAgent).then(() => {
      expect(mock.history.get[0].params).toEqual({
        url: "https://www.instagram.com/p/BftIg_OFPFX/",
        format: "json"
      });
      done();
    });
  });

  test("call axios with normal proxy", done => {
    const proxyAgent = {
      host: "127.0.0.1",
      port: "9528",
      useSocks5: false
    };

    mock.onGet(endpoint.url).reply(200, response);
    fetchOembed(endpoint, proxyAgent).then(() => {
      expect(mock.history.get[0].params).toEqual({
        url: "https://www.instagram.com/p/BftIg_OFPFX/",
        format: "json"
      });
      done();
    });
  });
});
