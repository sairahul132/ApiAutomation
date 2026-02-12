module.exports = {
  default: {
    require: ["stepdefinition/**/*.js"],
    format: [
      "pretty",
      "summary",
      "json:reports/report.json"
    ],
    paths: ["features/**/*.feature"],
    tags: process.env.TAGS || ""
  }
};
