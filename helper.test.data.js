exports.MARKDOWN_AST = {
  children: [
    {
      position: {
        end: {
          column: 4,
          line: 4,
          offset: 62
        },
        indent: [1, 1, 1],
        start: {
          column: 1,
          line: 1,
          offset: 0
        }
      },
      type: "yaml",
      value: 'title: New Beginnings\ndate: "2015-05-28T22:40:32.169Z"'
    },
    {
      children: [
        {
          children: [
            {
              position: {
                end: {
                  column: 44,
                  line: 6,
                  offset: 107
                },
                indent: [],
                start: {
                  column: 1,
                  line: 6,
                  offset: 64
                }
              },
              type: "text",
              value: "https://www.youtube.com/watch?v=b2H7fWhQcdE"
            }
          ],
          position: {
            end: {
              column: 44,
              line: 6,
              offset: 107
            },
            indent: [],
            start: {
              column: 1,
              line: 6,
              offset: 64
            }
          },
          title: null,
          type: "link",
          url: "https://www.youtube.com/watch?v=b2H7fWhQcdE"
        }
      ],
      position: {
        end: {
          column: 44,
          line: 6,
          offset: 107
        },
        indent: [],
        start: {
          column: 1,
          line: 6,
          offset: 64
        }
      },
      type: "paragraph"
    },
    {
      children: [
        {
          position: {
            end: {
              column: 29,
              line: 9,
              offset: 213
            },
            indent: [1],
            start: {
              column: 1,
              line: 8,
              offset: 109
            }
          },
          type: "text",
          value:
            "Far far away, behind the word mountains, far from the countries Vokalia and\nConsonantia, there live the "
        },
        {
          children: [
            {
              position: {
                end: {
                  column: 41,
                  line: 9,
                  offset: 225
                },
                indent: [],
                start: {
                  column: 30,
                  line: 9,
                  offset: 214
                }
              },
              type: "text",
              value: "blind texts"
            }
          ],
          position: {
            end: {
              column: 62,
              line: 9,
              offset: 246
            },
            indent: [],
            start: {
              column: 29,
              line: 9,
              offset: 213
            }
          },
          title: null,
          type: "link",
          url: "http://example.com"
        },
        {
          position: {
            end: {
              column: 102,
              line: 9,
              offset: 286
            },
            indent: [],
            start: {
              column: 62,
              line: 9,
              offset: 246
            }
          },
          type: "text",
          value: ". Separated they live in Bookmarksgrove."
        }
      ],
      position: {
        end: {
          column: 102,
          line: 9,
          offset: 286
        },
        indent: [1],
        start: {
          column: 1,
          line: 8,
          offset: 109
        }
      },
      type: "paragraph"
    }
  ],
  position: {
    end: {
      column: 1,
      line: 10,
      offset: 287
    },
    start: {
      column: 1,
      line: 1,
      offset: 0
    }
  },
  type: "root"
};

exports.PROVIDERS = [
  {
    provider_name: "Instagram",
    provider_url: "https://instagram.com",
    endpoints: [
      {
        schemes: [
          "http://instagram.com/p/*",
          "http://instagr.am/p/*",
          "http://www.instagram.com/p/*",
          "http://www.instagr.am/p/*",
          "https://instagram.com/p/*",
          "https://instagr.am/p/*",
          "https://www.instagram.com/p/*",
          "https://www.instagr.am/p/*"
        ],
        url: "https://api.instagram.com/oembed",
        formats: ["json"]
      }
    ]
  },
  {
    provider_name: "Kickstarter",
    provider_url: "http://www.kickstarter.com",
    endpoints: [
      {
        schemes: ["http://www.kickstarter.com/projects/*"],
        url: "http://www.kickstarter.com/services/oembed"
      }
    ]
  },
  {
    provider_name: "Twitter",
    provider_url: "http://www.twitter.com/",
    endpoints: [
      {
        schemes: [
          "https://twitter.com/*/status/*",
          "https://*.twitter.com/*/status/*"
        ],
        url: "https://publish.twitter.com/oembed"
      }
    ]
  }
];
