const Remark = require("remark");
const remarkGfm = require("remark-gfm");
const selectPossibleOembedLinkNodes = require("./selectPossibleOembedLinkNodes");

const sourceMarkdown = `

## Non prefix links

Finds standalone links when no prefix set:

http://www.youtube.com/watch?v=iwGFalTRHDA

[YouTube](http://www.youtube.com/watch?v=iwGFalTRHDA)

Does not find standalone inline code links when no prefix set:

\`https://www.instagram.com/p/Bof9WhgBmY2\`

Does not find [inline links](http://example.com).

Does not find links that are in a list:

- http://www.youtube.com/watch?v=iwGFalTRHDA
- [YouTube](http://www.youtube.com/watch?v=iwGFalTRHDA)

Does not find links that are also an image:

[![Tweet](https://queen.raae.codes/testimonials/gatsby-plugin-starter-ash.png)](https://twitter.com/Ash_Hitchcock/status/1471048277747548163?s=20&t=YKN2khQAbqaLSSccqculsw)

## Prefix links

Does find standalone inline code links when prefix set to "oembed":

\`oembed: https://twitter.com/raae/status/1045394833001652225\`

Does find standalone inline code links when prefix set to "video" and no space between:

\`video:https://www.twitch.tv/videos/72749628\`
`;

describe("#selectPossibleOembedLinkNodes", () => {
  const remark = new Remark();
  const MARKDOWN_AST = remark.use(remarkGfm).parse(sourceMarkdown);

  test("select only links that are the only child of a paragraph", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST);
    expect(possibleOembedLinks).toHaveLength(2);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "link",
      url: "http://www.youtube.com/watch?v=iwGFalTRHDA",
    });
    expect(possibleOembedLinks[1]).toMatchObject({
      type: "link",
      url: "http://www.youtube.com/watch?v=iwGFalTRHDA",
    });
  });

  test("select only links that inline code and prefixed with 'oembed:'", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST, [
      "oembed",
    ]);
    expect(possibleOembedLinks).toHaveLength(1);
    // allow space after 'oembed:'
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "inlineCode",
      url: "https://twitter.com/raae/status/1045394833001652225",
    });
  });

  test("select only links that inline code and prefixed with 'video:'", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST, [
      "video",
    ]);
    expect(possibleOembedLinks).toHaveLength(1);
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "inlineCode",
      url: "https://www.twitch.tv/videos/72749628",
    });
  });

  test("select only links that inline code and prefixed with 'oembed:' or 'video:'", () => {
    const possibleOembedLinks = selectPossibleOembedLinkNodes(MARKDOWN_AST, [
      "oembed",
      "video",
    ]);
    expect(possibleOembedLinks).toHaveLength(2);
    // allow space after 'oembed:'
    expect(possibleOembedLinks[0]).toMatchObject({
      type: "inlineCode",
      url: "https://twitter.com/raae/status/1045394833001652225",
    });
    expect(possibleOembedLinks[1]).toMatchObject({
      type: "inlineCode",
      url: "https://www.twitch.tv/videos/72749628",
    });
  });
});
