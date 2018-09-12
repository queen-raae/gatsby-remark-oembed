const React = require("react");

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

const DEFAULT_OPTIONS = {
  providers: {
    include: undefined,
    exclude: undefined
  }
};

exports.onRenderBody = ({ setPostBodyComponents }, options) => {
  const scripts = Object.keys(SCRIPTS).map(key =>
    createScriptTag(key, SCRIPTS)
  );
  setPostBodyComponents(scripts);
};
