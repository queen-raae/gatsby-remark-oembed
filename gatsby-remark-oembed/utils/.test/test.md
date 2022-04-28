---
title: Find Links Test
---

Finds standalone links when no prefix set:

http://www.youtube.com/watch?v=iwGFalTRHDA

[YouTube](http://www.youtube.com/watch?v=iwGFalTRHDA)

Finds standalone inline code links when no prefix set:

`https://www.instagram.com/p/Bof9WhgBmY2`

Does not find [inline links](http://example.com)

Does find standalone inline code links when prefix set to `oembed`:

`oembed: https://twitter.com/raae/status/1045394833001652225`

Does find standalone inline code links when prefix set to `video` and no space between:

`video:https://www.twitch.tv/videos/72749628`

Does not find links inside lists:

- http://www.youtube.com/watch?v=iwGFalTRHDA
- [YouTube](http://www.youtube.com/watch?v=iwGFalTRHDA)
