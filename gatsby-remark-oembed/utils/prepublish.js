const fs = require("fs");
const fetchOembedProviders = require("./fetchOembedProviders");

const prepublish = async () => {
  try {
    const providers = await fetchOembedProviders();
    fs.writeFileSync(".prefetched-providers.json", JSON.stringify(providers));
  } catch (e) {
    throw new Error("Error while prefetching oembed providers.");
  }
};

module.exports = prepublish;
