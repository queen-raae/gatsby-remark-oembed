const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) =>
  setPostBodyComponents([
    <script
      key={`gatsby-plugin-oembed-twitter`}
      src="https://platform.twitter.com/widgets.js"
    />,
    <script
      key={`gatsby-plugin-oembed-instagram`}
      src="https://www.instagram.com/embed.js"
    />,
    <script
      key={`gatsby-plugin-oembed-flickr`}
      src="https://embedr.flickr.com/assets/client-code.js"
    />,
    <script
      key={`gatsby-plugin-oembed-flickr`}
      src="https://embed.redditmedia.com/widgets/platform.js"
    />
  ]);
