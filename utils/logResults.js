const logResults = (results, node, reporter) => {
  let successfulEmbedsCount = 0;
  let failedEmbedsCount = 0;
  let unconformingEmbedsCount = 0;
  let message = "";

  for (const result of results) {
    if (result instanceof Error) {
      failedEmbedsCount++;
      reporter.error(
        `gatsby-remark-oembed: Error embedding ${result.url}`,
        result
      );
    } else if (result) {
      successfulEmbedsCount++;
    } else {
      unconformingEmbedsCount++;
    }
  }

  message += `gatsby-remark-oembed:`;
  message += ` Successful embeds: ${successfulEmbedsCount}`;

  if (failedEmbedsCount > 0) {
    message += ` | Failed embeds: ${failedEmbedsCount}`;
  }
  if (unconformingEmbedsCount > 0) {
    message += ` | Links with no matching provider: ${unconformingEmbedsCount}`;
  }

  message += ` | Node: ${node.id}`;

  reporter.info(message);
};

module.exports = logResults;
