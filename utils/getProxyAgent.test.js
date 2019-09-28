const getProxyAgent = require("./getProxyAgent");

describe("#getProxyAgent", () => {
  test("useProxy = false ", () => {
    const useProxy = false;
    expect(getProxyAgent(useProxy)).toBeFalsy();
  });

  test("useProxy = {} ", () => {
    const useProxy = {};
    const proxyAgent = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: true,
      agent: {}
    };
    const res = getProxyAgent(useProxy);
    expect(res).toMatchObject(proxyAgent);
    expect(res).toHaveProperty("agent");
  });

  test("useProxy = an Object without socks5", () => {
    const useProxy = {
      host: "127.0.0.1",
      port: "1080"
    };
    const proxyAgent = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: true
    };
    const res = getProxyAgent(useProxy);
    expect(res).toMatchObject(proxyAgent);
    expect(res).toHaveProperty("agent");
  });

  test("useProxy = an Object with useSocks5 on", () => {
    const useProxy = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: true
    };
    const proxyAgent = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: true
    };
    const res = getProxyAgent(useProxy);
    expect(res).toMatchObject(proxyAgent);
    expect(res).toHaveProperty("agent");
  });

  test("useProxy = an Object with useSocks5 off", () => {
    const useProxy = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: false,
      auth: {
        username: "foo",
        password: "123"
      }
    };
    const proxyAgent = {
      host: "127.0.0.1",
      port: "1080",
      useSocks5: false,
      auth: {
        username: "foo",
        password: "123"
      }
    };
    expect(getProxyAgent(useProxy)).toEqual(proxyAgent);
  });
});
