exports.onRouteUpdate = () => {
  if (
    typeof twttr !== `undefined` &&
    twttr.widgets &&
    typeof twttr.widgets.load === `function`
  ) {
    twttr.widgets.load(document.getElementById("___gatsby"));
  }
};
