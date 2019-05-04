const logResults = require("./logResults");

describe("#logResults", () => {
  const results = [undefined, new Error("Test Error"), {}, {}, undefined, {}];
  const reporter = {
    info: jest.fn(),
    error: jest.fn()
  };
  logResults(results, "/test-path/", reporter);

  test("Calls reporter.info correctly", () => {
    expect(reporter.info.mock.calls.length).toBe(1);
    expect(reporter.info.mock.calls[0][0]).toContain("Successfull embeds: 3");
    expect(reporter.info.mock.calls[0][0]).toContain("Failed embeds: 1");
    expect(reporter.info.mock.calls[0][0]).toContain(
      "Links with no matching provider: 2"
    );
    expect(reporter.info.mock.calls[0][0]).toContain("Path: /test-path/");
  });

  test("Calls reporter.error correctly", () => {
    expect(reporter.error.mock.calls.length).toBe(1);
    expect(reporter.error.mock.calls[0][1]).toEqual(new Error("Test Error"));
  });
});
