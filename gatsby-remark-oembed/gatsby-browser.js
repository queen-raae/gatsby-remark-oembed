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

const loadTikTok = () => {
  if (undefined === document.querySelector('.tiktok-embed')) return;

  // Remove extra copies of the script
  document.querySelectorAll('script[src="https://www.tiktok.com/embed.js"]').forEach(el => el.remove());

  const script = document.createElement(`script`)

  script.type = `text/javascript`
  script.innerText = `window.tiktok=function(e,t,n){var o,i=e.getElementsByTagName(t)[0],r=window.tiktok||{};return e.getElementById(n)||((o=e.createElement(t)).id=n,o.src="https://www.tiktok.com/embed.js",i.parentNode.insertBefore(o,i),r._e=[],r.ready=function(e){r._e.push(e)}),r}(document,"script","tiktok-wjs");`

  document.getElementsByTagName('head')[0].appendChild(script);
}

const initScripts = () => {
  loadTwitter();
  processInstagram();
  loadTikTok();
};

exports.onInitialClientRender = initScripts;
exports.onRouteUpdate = initScripts;
