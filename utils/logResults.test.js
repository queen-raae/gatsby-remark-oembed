const logResults = require("./logResults");

describe("#logResults", () => {
  const results = [undefined, new Error("Test Error"), {}, {}, undefined, {}];
  const reporter = {
    info: jest.fn(message => {}),
    warn: jest.fn(message => {}),
    error: jest.fn((message, error) => {})
  };
  logResults(results, reporter);

  test("Calls reporter.info correctly", () => {
    // Once for possible summary and once for successful links
    expect(reporter.info.mock.calls.length).toBe(2);
    // There should be 5 possible links
    expect(reporter.info.mock.calls[0][0]).toContain("6 possible link(s)");
    // There should be 2 successful links
    expect(reporter.info.mock.calls[1][0]).toContain("3 link(s)");
  });

  test("Calls reporter.warn correctly", () => {
    // Once for error summary and once for unconforming links
    expect(reporter.warn.mock.calls.length).toBe(2);
    // There should be 1 failed links
    expect(reporter.warn.mock.calls[0][0]).toContain("1 link(s)");
    // There should be 2 unconforming links
    expect(reporter.warn.mock.calls[1][0]).toContain("2 link(s)");
  });

  test("Calls reporter.error correctly", () => {
    // There should be 1 failed link
    expect(reporter.error.mock.calls.length).toBe(1);
    // It should use the result as the error argument
    expect(reporter.error.mock.calls[0][1]).toEqual(new Error("Test Error"));
  });
});
