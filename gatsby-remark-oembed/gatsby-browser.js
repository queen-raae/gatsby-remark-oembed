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
  script.innerText = `
    window.tiktok = (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.tiktok || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://www.tiktok.com/embed.js";
      fjs.parentNode.insertBefore(js, fjs);
      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };
      return t;
    })(document, "script", "tiktok-wjs");`

  document.getElementsByTagName('head')[0].appendChild(script);
}

const initScripts = () => {
  loadTwitter();
  processInstagram();
  loadTikTok();
};

exports.onInitialClientRender = initScripts;
exports.onRouteUpdate = initScripts;
