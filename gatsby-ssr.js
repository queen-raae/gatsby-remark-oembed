const React = require("react");
const { ammendOptions, filterProviderKeys } = require("./helpers");

const SCRIPTS = {
  Twitter: "https://platform.twitter.com/widgets.js",
  Instagram: "https://www.instagram.com/embed.js",
  Flickr: "https://embedr.flickr.com/assets/client-code.js",
  RedditMedia: "https://embed.redditmedia.com/widgets/platform.js"
};

const createScriptTag = (key, scripts) => {
  return (
    <script
      key={`gatsby-plugin-oembed-${key.toLowerCase()}`}
      src={scripts[key]}
    />
  );
};

exports.onRenderBody = ({ setPostBodyComponents }, options) => {
  options = ammendOptions(options);

  const scriptKeys = filterProviderKeys(
    Object.keys(SCRIPTS),
    options.providers
  );

  const scripts = scriptKeys.map(key => createScriptTag(key, SCRIPTS));
  setPostBodyComponents(scripts);
};
