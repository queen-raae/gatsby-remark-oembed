module.exports = [
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
  },
  {
    provider_name: "YouTube"
  }
];
