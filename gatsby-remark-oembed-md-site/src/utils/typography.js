import Typography from "typography";
import Wordpress2016 from "typography-theme-wordpress-2016";

Wordpress2016.overrideThemeStyles = () => ({
  "a.gatsby-resp-image-link": {
    boxShadow: "none"
  },
  "a.gatsby-remark-oembed-preview-link": {
    textDecoration: "none",
    boxShadow: "none"
  },
  "h3.gatsby-remark-oembed-preview-title, p.gatsby-remark-oembed-preview-description": {
    margin: "10px 10px"
  },
  "p.gatsby-remark-oembed-preview-host": {
    margin: "5px 10px"
  },
  "img.gatsby-remark-oembed-preview-image": {
    margin: "0"
  },
  ".gatsby-remark-oembed-preview-wrapper": {
    border: "1px solid #007acc"
  }
});

delete Wordpress2016.googleFonts;

const typography = new Typography(Wordpress2016);

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
