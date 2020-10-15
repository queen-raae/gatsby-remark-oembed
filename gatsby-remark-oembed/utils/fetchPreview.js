const { unfurl } = require("unfurl.js");

const fetchPreview = async url => {
  return await unfurl(url);
};

module.exports = fetchPreview;
