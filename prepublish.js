#!/usr/bin/env node

const prepublish = async () => {
  // eslint-disable-next-line no-console
  console.log("Prefetching providers ...");
  await require("./utils/prepublish")();

  // eslint-disable-next-line no-console
  console.log("Finished prefetching providers ...");
};

prepublish();
