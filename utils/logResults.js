const logResults = (results, reporter) => {
  let possibleEmbedsCount = results.length;
  let successfulEmbedsCount = 0;
  let failedEmbedsCount = 0;
  let unconformingEmbedsCount = 0;

  for (result of results) {
    if (result instanceof Error) {
      failedEmbedsCount++;
      reporter.error(
        `gatsby-remark-oembed: Error embedding ${result.url}`,
        result
      );
    } else if (!!result) {
      successfulEmbedsCount++;
    } else {
      unconformingEmbedsCount++;
    }
  }

  reporter.info(
    `gatsby-remark-oembed: Found ${possibleEmbedsCount} possible link(s)`
  );
  reporter.info(
    `gatsby-remark-oembed: Successfully embedded ${successfulEmbedsCount} link(s)`
  );

  if (failedEmbedsCount > 0) {
    reporter.warn(
      `gatsby-remark-oembed: Failed at embedding ${failedEmbedsCount} link(s)`
    );
  }

  if (unconformingEmbedsCount > 0) {
    reporter.warn(
      `gatsby-remark-oembed: ${unconformingEmbedsCount} link(s) did not match a provider`
    );
  }
};

module.exports = logResults;
