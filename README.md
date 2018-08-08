# Gatsby Remark Oembed Plugin

> A GatsbyJS Plugin that transforms oembed links into its corresponding embed code.

# Development

## Set up

To start we develop it like it would be a local plugin. Ie. we create a Gatsby site and then clone this repo into its plugins folder. And do not think about any build steps.

1.  Use the Gatsby CLI to initialize a Gatsby starter template. `gatsby new blog https://github.com/gatsbyjs/gatsby-starter-blog`.
2.  Move into its directory `cd blog`.
3.  Create a plugins folder `mkdir plugins`.
4.  Move into the plugins foler `cd plugins`.
5.  Clone this repo `git clone git@github.com:lillylabs/gatsby-remark-oembed.git`
6.  Add the following to the plugins property of the `gatsby-transformer-remark` plugin in `gatsby-config.js`:

        {
          resolve: `gatsby-remark-oembed`
        },

7.  Add a oembed link to one of the markdown posts (pages) on a line with an empty line above and below.
8.  Serve up the page using `gatsby develop`.
9.  Take a look at the post you added the oembed link to, and see it being transformed into something else.

# Motivation

In WordPress it is possible to paste in an oembed url and watch as it turns into its embedded counterpart. Why is this beneficial?

1.  The writer does not have to figure out how to to embed content from a different site.
1.  The content is embedded in the same way each time.

## How does oembed work

Each content service that supports omebed has an oembed endpoint. This endpoint returns information about how to embed a certain url when called.

- [The oembed site](https://oembed.com/)

### Examples

#### YouTube

- **Url to be embedded:** `https://www.youtube.com/watch?v=b2H7fWhQcdE`
- **Endpoint:** `http://www.youtube.com/oembed?url=<url>&format=json`
- **Request:** `http://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=b2H7fWhQcdE&format=json`

**Result:**

```
{
  "author_name": "LevelUpTuts",
  "author_url": "https://www.youtube.com/user/LevelUpTuts",
  "height": 270,
  "html": "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/b2H7fWhQcdE?feature=oembed\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>",
  "provider_name": "YouTube",
  "provider_url": "https://www.youtube.com/",
  "thumbnail_height": 360,
  "thumbnail_url": "https://i.ytimg.com/vi/b2H7fWhQcdE/hqdefault.jpg",
  "thumbnail_width": 480,
  "title": "GatsbyJS Tutorials #1 - Getting Started with Gatsby",
  "type": "video",
  "version": "1.0",
  "width": 480
}
```

#### Instagram

- **Url to be embedded:** `https://www.instagram.com/p/BftIg_OFPFX/`
- **Endpoint:** `https://api.instagram.com/oembed?url=<url>&format=json`
- **Request:** `https://api.instagram.com/oembed?url=https://www.instagram.com/p/BftIg_OFPFX/&format=json`

**Result:**

```
{
  "author_id": 2770496343,
  "author_name": "leveluptutorials",
  "author_url": "https://www.instagram.com/leveluptutorials",
  "height": null,
  "html": "<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-permalink=\"https://www.instagram.com/p/BftIg_OFPFX/\" data-instgrm-version=\"9\" style=\" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);\"><div style=\"padding:8px;\"> <div style=\" background:#F8F8F8; line-height:0; margin-top:40px; padding:50.0% 0; text-align:center; width:100%;\"> <div style=\" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;\"></div></div> <p style=\" margin:8px 0 0 0; padding:0 4px;\"> <a href=\"https://www.instagram.com/p/BftIg_OFPFX/\" style=\" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;\" target=\"_blank\">Preparing Pro Gatsby for release later today on leveluptutorials.com . . . . . #developer #frontenddeveloper #webdeveloper #webdevelopment #codingisfun #worldcode #programmerrepublic #code #programming #frontend #codinglife #worldcode #educateyourself #educateyourselfclub #javascript #js #es6 #es2015 #webapp #websitedesign #webdesign #codeismylife #buildtheweb #becreative #graphql #apollo #react #fullstack #graphqlftw #gatsbyjs #jamstack</a></p> <p style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;\">A post shared by <a href=\"https://www.instagram.com/leveluptutorials/\" style=\" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\" target=\"_blank\"> Level Up Tutorials</a> (@leveluptutorials) on <time style=\" font-family:Arial,sans-serif; font-size:14px; line-height:17px;\" datetime=\"2018-02-27T15:29:42+00:00\">Feb 27, 2018 at 7:29am PST</time></p></div></blockquote>\n<script async defer src=\"//www.instagram.com/embed.js\"></script>",
  "media_id": "1724071683630100823_2770496343",
  "provider_name": "Instagram",
  "provider_url": "https://www.instagram.com",
  "thumbnail_height": 640,
  "thumbnail_url": "https://scontent-arn2-1.cdninstagram.com/vp/37beb21c7e54d137ede1c6f33b831f1b/5BD6EC6D/t51.2885-15/sh0.08/e35/s640x640/28158871_535207446872681_8309782615540367360_n.jpg",
  "thumbnail_width": 640,
  "title": "Preparing Pro Gatsby for release later today on leveluptutorials.com\n.\n.\n.\n.\n.\n#developer #frontenddeveloper #webdeveloper #webdevelopment #codingisfun #worldcode #programmerrepublic #code #programming #frontend #codinglife #worldcode #educateyourself #educateyourselfclub #javascript #js #es6 #es2015 #webapp #websitedesign #webdesign #codeismylife #buildtheweb #becreative #graphql #apollo #react #fullstack #graphqlftw #gatsbyjs #jamstack",
  "type": "rich",
  "version": "1.0",
  "width": 658
}
```

## Implementation Notes

In WordPress this is done when the writer pastes the url into the content area, and the resulting html is saved to the database. In Gatsby's case this will have to be done at build time through this transform plugin.

This plugin will work as a plugin for the [gatsby-tranformer-remark](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark) plugin. There are many such plugins. We could later make it more general, so it will look for oembed url in other types of content as well.

It would be good to whitelist and/or blacklist providers. In WordPress it is possible to add new providers not included in the official oembed providers lists.

Some sort of caching would be good, so multiple call to the same api with the same url does not need to be repeated multiple times in one build.

# Pseudo code

1.  Fetch the oembed provider list.
2.  Find link nodes in markdown structure that are on their own, not part of some other content.
3.  Check if url matched any of the oembed url schemes.
4.  Fetch the oembed response from the oembed provider.
5.  Transform the link node into an html node using html value from the oembed response.

# Relevant code/projects

- [oembed-parser](https://github.com/ndaidong/oembed-parser): Oembed parser library. Has a hard copy of the provider list in its source.
- [gatsby-remark-embed-youtube](https://github.com/ntwcklng/gatsby-remark-embed-youtube): Very simple plugin that replaces urls prepended with `youtube:` with hardcoded iframe html snippet.
- [gatsby-remark-images](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images): Created by the founder of GatsbyJS and used by almost all Gatsby-sites. So could be good point of reference.

# Relevant documentation

- [Plugin Authoring by GatsbyJS](https://next.gatsbyjs.org/docs/plugin-authoring/)
  - Lets just start with supporting v2 coming out soon.
- [Ombed official site](https://oembed.com/)
