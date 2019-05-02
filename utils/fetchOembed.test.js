const fetchOembed = require("./fetchOembed");

describe("#fetchOembed", () => {
  test("return correctly formated response", () => {
    const response = {
      html: expect.anything()
    };
    return expect(
      fetchOembed({
        url: "https://api.instagram.com/oembed",
        params: {
          url: "https://www.instagram.com/p/BftIg_OFPFX/"
        }
      })
    ).resolves.toMatchObject(response);
  });
});
