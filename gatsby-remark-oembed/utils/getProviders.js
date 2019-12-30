const fs = require("fs");
const path = require("path");
const util = require("util");
const amendOptions = require("./amendOptions");
const amendProviders = require("./amendProviders");
const filterProviders = require("./filterProviders");
const fetchOembedProviders = require("./fetchOembedProviders");

module.exports = async ({ cache, reporter }, rawOptions) => {
  const providers = await fetchFromGatsbyCache({ cache, reporter });
  if (providers) return providers;

  let rawProviders = await fetchFromOembed({ reporter });

  if (!rawProviders) {
    rawProviders = await fetchFromPreFetchedFile({ reporter });
  }

  if (!rawProviders) {
    reporter.error(
      "gatsby-remark-oembed: No providers fetched, oembed links will not be embedded"
    );
  }

  try {
    const options = amendOptions(rawOptions);
    const providers = processProviders(rawProviders, options.providers);
    return await cache.set("remark-oembed-providers", providers);
  } catch (error) {
    reporter.error(
      `gatsby-remark-oembed: Failed to save providers to cache - ${error.message}`
    );
  }
};

const fetchFromGatsbyCache = async ({ cache, reporter }) => {
  const providers = await cache.get("remark-oembed-providers");
  if (!providers) {
    reporter.info("gatsby-remark-oembed: No providers in cache");
  }
  return providers;
};

const fetchFromOembed = async ({ reporter }) => {
  reporter.info("gatsby-remark-oembed: Fetching providers from oembed.com");

  try {
    return await fetchOembedProviders();
  } catch (error) {
    reporter.info(
      `gatsby-remark-oembed: Failed to fetch list of providers from oembed.com - ${error.message}`
    );
  }
};

const fetchFromPreFetchedFile = async ({ reporter }) => {
  reporter.info(
    "gatsby-remark-oembed: Fetching providers from pre fetched list"
  );

  try {
    const readFile = util.promisify(fs.readFile);
    const filePath = path.join(__dirname, "../.prefetched-providers.json");
    const file = await readFile(filePath);
    return JSON.parse(file);
  } catch (error) {
    reporter.info(
      `gatsby-remark-oembed: Failed to fetch pre fetched list - ${error.message}`
    );
  }
};

const processProviders = (providers, providerOptions = {}) => {
  providers = amendProviders(providers, providerOptions.settings);
  return filterProviders(providers, providerOptions);
};
