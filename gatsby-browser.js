/*global twttr instgrm*/

const SCRIPTS = {
  Twitter: "https://platform.twitter.com/widgets.js",
  Instagram: "https://www.instagram.com/embed.js",
  Flickr: "https://embedr.flickr.com/assets/client-code.js",
  Reddit: "https://embed.redditmedia.com/widgets/platform.js"
};

const EMBED_ELEMENT = {
  Twitter: ".twitter-tweet",
  Instagram: "blockquote.instagram-media",
  Flickr: '[data-flickr-embed="true"]',
  Reddit: "blockquote.reddit-card"
};

const addScript = (d, src, id, callback) => {
  const fjs = d.getElementsByTagName("script")[0];
  if (d.getElementById(id)) return;
  const js = d.createElement("script");
  js.id = id;
  js.src = src;
  js.onload = callback;
  fjs.parentNode.insertBefore(js, fjs);
  return js;
};

const loadTwitter = () => {
  if (
    typeof twttr !== `undefined` &&
    twttr.widgets &&
    typeof twttr.widgets.load === `function`
  ) {
    twttr.widgets.load(document.getElementById("___gatsby"));
  }
};

const processInstagram = () => {
  if (
    typeof instgrm !== `undefined` &&
    instgrm.Embeds &&
    typeof instgrm.Embeds.process === `function`
  ) {
    instgrm.Embeds.process();
  }
};

const load = (key, callback) => {
  if (document.querySelector(EMBED_ELEMENT[key]))
    addScript(document, SCRIPTS[key], `${key}-oembed`, callback);
};

const onIdle = callback => {
  if (requestIdleCallback) {
    requestIdleCallback(() => requestAnimationFrame(callback));
  } else {
    setTimeout(callback, 2000);
  }
};

const initScripts = () => {
  onIdle(() => {
    load("Twitter", loadTwitter);
    load("Instagram", processInstagram);
    load("Reddit");
    load("Flickr");
  });
};

exports.onInitialClientRender = initScripts;
exports.onRouteUpdate = initScripts;
