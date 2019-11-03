# Gatsby Remark Oembed Plugin

> This GatsbyJS Remark Sub-Plugin transforms oembed links (Twitter, Instagram, YouTube, Vimeo, SoundCloud, CodePen etc.) into its corresponding embed code.

This is an early version of the plugin. Let me know if you have problems or questions by submitting an issue.

## Install

`npm install @raae/gatsby-remark-oembed`

## Requirements

- Node version 8 and up.
- Gatsby version >=2.0.88
- Gatsby Transformer Remark Plugin >=2.0.0

## Oembed support

Under the hood the oembed provider list from [oembed.com](https://oembed.com/#section7) is used.

So far these providers are confirmed to be working: CodePen, Flickr, Instagram, Reddit, Twitch, Twitter, Vimeo, YouTube, SoundCloud.

Twitter, Flickr, Instagram and Reddit requires external javascript to be added to every page. So make sure to exclude the ones you do not need.

## Example site

Check out [gatsby-remark-oembed.netlify.com/](https://gatsby-remark-oembed.netlify.com/). Its source code can be found on [Github](https://github.com/raae/gatsby-remark-oembed-example-site).

## How to use

### Configuration

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            // usePrefix defaults to false
            // usePrefix: true is the same as ["oembed"]
            usePrefix: ["oembed", "video"],
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
];
```

#### Optional `settings` for providers

Many oEmbed providers offer additional options for configure the display of the embed.

For example, for Instagram see [Instagram – Embedding for Developers](https://www.instagram.com/developer/embedding/), which describes the additional oEmbed parameters you might want to change for the embed.

```js
// …
{
  resolve: `@raae/gatsby-remark-oembed`,
  options: {
    usePrefix: true,
    providers: {
      include: [
        'Twitter',
        'Instagram',
      ]
      settings: {
        // Ex. Show all Twitter embeds with the dark theme
        Twitter: { theme: 'dark' },
        // Ex. Hide all Instagram comments by default
        Instagram: { hidecaption: true },
      },
    },
  },
}
```

### Content

#### With setting `usePrefix: true`

```md
// In your markdown file

Check it out! I can use oembed links in my markdown.

`oembed: https://twitter.com/raae/status/1045394833001652225`

Its pretty cool :D

`oembed: https://www.instagram.com/p/Bof9WhgBmY2/`
```

Links must be surrounded by empty lines.

#### With setting `usePrefix: array of prefixes`

If you would like to use a prefix other than "oembed" or multiple prefixes you can set `usePrefix` to an array of custom prefixes. This can be beneficial when converting from other embed plugins.

`usePrefix: ["embed", "video", "oembed"]`

```md
// In your markdown file

Check it out! I can use the prefix "oembed:"

`oembed: https://twitter.com/raae/status/1045394833001652225`

Or I can use the prefix "embed:" if I like ;)

`embed: https://www.instagram.com/p/Bof9WhgBmY2/`

I can also use "video:" like I did before with `gatsby-remark-video`.

`video: https://vimeo.com/42672205`
```

`usePrefix: true` in the section above is the same as `usePrefix: ["oembed"]`.

#### With setting `usePrefix: false`

```md
// In your markdown file

Check it out! I can use oembed links in my markdown.

https://twitter.com/raae/status/1045394833001652225

Its pretty cool :D

https://www.instagram.com/p/Bof9WhgBmY2/
```

Links must be surrounded by empty lines.

## Options

| Name                 | Type                        | Description                                                 |
| -------------------- | --------------------------- | ----------------------------------------------------------- |
| `usePrefix`          | Boolean / Array of prefixes | See above section on content                                |
| `providers.include`  | Array of provider keys      | Only links from providers on this list will be transformed. |
| `providers.exclude`  | Array of provider keys      | Links from providers on this list will not be transformed.  |
| `providers.settings` | Object of provider settings | Optional configuration unique to each provider.             |

## Release routines

Make sure you have checked out and updated master.

- Run `npm version patch|minor|major`
- Run `npm publish`
- Create a [release on Github](https://github.com/raae/gatsby-remark-oembed/releases/new).

## Buy me a coffee?

It will encourage me to keep it going, fix whatever bugs you find and spend time making it better :D

[![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/P5P4OZVX)
