# Gatsby Remark oEmbed Plugin

> This GatsbyJS Remark Sub-Plugin transforms oEmbed links (Twitter, Instagram, YouTube, Vimeo, SoundCloud, CodePen etc.) into its corresponding embed code.

Works with both `gatsby-transformer-remark` and `gatsby-plugin-mdx`.

Let me know if you have problems or questions by submitting an issue.

## Install

`npm install @raae/gatsby-remark-oembed`

or

`yarn add @raae/gatsby-remark-oembed`

## Requirements

- Node version 8 and up.
- Gatsby version >=2.0.88
- Gatsby Transformer Remark Plugin >=2.0.0

## oEmbed support

Under the hood the oEmbed provider list from [oembed.com](https://oembed.com/#section7) is used.

So far these providers are confirmed to be working: CodePen, Flickr, Instagram, Reddit, Twitter, Vimeo, YouTube, SoundCloud.

Twitter, Flickr, Instagram and Reddit requires external javascript to be added to every page. So make sure to exclude the ones you do not need.

> **Warning:** The Instagram oEmbed API requires an access token. You'll need a Facebook Developer account, a Facebook App, and an App Access Token. [More information here](https://developers.facebook.com/docs/instagram/oembed), or take a look at this [tutorial for setting it all up in Gatsby with Environment Variables](https://phil.tech/2020/gatsby-instagram-oembed-failures/).

> **Update:** Twitch removed oEmbed support in 2020 when deprecating their v5 API. It seems they are not planning to support oEmbed again. Unfortunately this means Twitch urls are no longer being transformed. Let them know how you feel about this [on their forum](https://discuss.dev.twitch.tv/t/oembed-deprecation/24424/2).

## Demo sites

- [Markdown Demo Site](https://gatsby-remark-oembed.netlify.com/)
- [Mdx Demo Site](https://gatsby-remark-oembed-mdx.netlify.app)

## How to use

### Configuration example for gatsby-transformer-remark

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
              exclude: ["Reddit"],
            },
          },
        },
      ],
    },
  },
];
```

### Configuration example for gatsby-plugin-mdx

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      gatsbyRemarkPlugins: [
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
              exclude: ["Reddit"],
            },
            providers: {
              settings: {
                Twitter: {
                  theme: "dark", // Use the Twitter light theme
                },
              },
            },
          },
        },
      ],
    },
  },
];
```

#### Settings per provider

Many oEmbed providers offer additional options for configure the display of the embed.

For example, for Twitter see [Embedded Tweet parameter reference](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/guides/embedded-tweet-parameter-reference), which describes the additional oEmbed parameters you might want to change for the embed.

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
      ],
      settings: {
        // Ex. Show all Twitter embeds with the dark theme, and disables ad tracking
        Twitter: {
          theme: 'dark',
          dnt: true
        },
        // Ex. Hide all Instagram comments by default, and
        // add a facebook access token
        Instagram: {
           hidecaption: true,
           access_token: 'a-facebook-access-token'
        },
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

## Dev routines

This is a monorepo consisting of the plugin, and two example sites:

- `/gatsby-remark-oembed-md-site` - the markdown example site
- `/gatsby-remark-oembed-mdx-site` - the mdx example site

And the plugin `/gatsby-remark-oembed`.

## Release routines

Make sure you have checked out and updated master.

Change directory to `gatsby-remark-oembed`.

- Run `yarn version patch|minor|major`
- Run `yarn publish`
- Create a [release on Github](https://github.com/queen-raae/gatsby-remark-oembed/releases/new).

## Buy me a coffee?

It will encourage me to keep it going, fix whatever bugs you find and spend time making it better :D

[![ko-fi](https://www.ko-fi.com/img/donate_sm.png)](https://ko-fi.com/P5P4OZVX)
