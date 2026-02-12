const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');


const projectRoot = path.join(__dirname, '..');

const reportsDir = path.join(projectRoot, 'reports');
const jsonPath = path.join(reportsDir, 'report.json');
const htmlPath = path.join(reportsDir, 'report.html');


if (fs.existsSync(htmlPath)) {
  fs.unlinkSync(htmlPath);
}


if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

const options = {
  theme: 'hierarchy',
  jsonFile: jsonPath,
  output: htmlPath,
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "QA",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);

console.log("HTML Report Generated Successfully");
