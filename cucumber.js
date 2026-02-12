module.exports = {
  default: {
    require: ["src/stepdefinition/**/*.js"],
    format: [
      "pretty",
      "summary",
      "json:reports/report.json"
    ],
    paths: ["src/features/**/*.feature"],
    tags: process.env.TAGS || ""
  }
};
