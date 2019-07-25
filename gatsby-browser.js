/*global twttr instgrm*/

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

const initScripts = () => {
  loadTwitter();
  processInstagram();
};

exports.onInitialClientRender = initScripts;
exports.onRouteUpdate = initScripts;
