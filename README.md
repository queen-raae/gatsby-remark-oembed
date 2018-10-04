# Gatsby Remark Oembed Plugin

> This GatsbyJS Remark Sub-Plugin transforms oembed links (Twitter, Instagram, YouTube, Vimeo, SoundCloud, CodePen etc.) into its corresponding embed code.

This is an early version of the plugin. Let me know if you have problems or questions by submitting an issue.

## Install

`npm install raae/gatsby-remark-oembed`

## Requirements

- Node version 8 and up.
- Gatsby version 2.
  - Does not work in 2.0.18 because of broken sub-plugin cache api.

## Oembed support

Under the hood the oembed provider list from [oembed.com](https://oembed.com/) is used.

So far these providers are confirmed to be working: CodePen, Flickr, Instagram, Reddit, Twitch, Twitter, Vimeo, YouTube, SoundCloud.

Twitter, Flickr, Instagram and Reddit requires external javascript to be added to every page. So make sure to exclude the ones you do not need.

## How to use

### Configuration

```
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-oembed`,
          options: {
            providers: {
              // Important to exclude providers
              // that adds js to the page.
              // If you do not need them.
              exclude: ["Reddit"]
            }
          }
        }
      ]
    }
  }
]
```

### Content

```
// In your markdown file

Check it out! I can use oembed links in my markdown.

https://twitter.com/raae/status/1045394833001652225

Its pretty cool :D

https://www.instagram.com/p/Bof9WhgBmY2/
```

Links must be surrounded by empty lines.

## Options

| Name                | Type                   | Description                                                 |
| ------------------- | ---------------------- | ----------------------------------------------------------- |
| `providers.include` | Array of provider keys | Only links from providers on this list will be transformed. |
| `providers.exclude` | Array of provider keys | Links from providers on this list will not be transformed.  |
