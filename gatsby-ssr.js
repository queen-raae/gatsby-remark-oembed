const React = require("react");

exports.onRenderBody = ({ setPostBodyComponents }) =>
  setPostBodyComponents([
    <script
      key={`gatsby-plugin-oembed-twitter`}
      src="https://platform.twitter.com/widgets.js"
    />
  ]);
